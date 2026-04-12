import { OrderStatus } from "../../generated/client/index.js";
import { prisma } from "../../lib/prisma.js";
import {
  OrderQueryParams,
  UpdateOrderStatusPayload,
} from "../../types/index.js";
import AppError from "../../utils/AppError.js";

// order.service.ts
const createOrder = async ({ userId }: { userId: string }) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Get cart items with stock check
    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      include: { medicine: true },
    });

    if (cartItems.length === 0) {
      throw new AppError(400, "Cart is empty");
    }

    // 2. Check stock availability for all items
    for (const item of cartItems) {
      const result = await tx.medicines.updateMany({
        where: {
          id: item.medicineId,
          stock: { gte: item.quantity },
        },
        data: {
          stock: { decrement: item.quantity },
        },
      });

      if (result.count === 0) {
        throw new AppError(400, `Insufficient stock for ${item.medicine.name}`);
      }
    }

    // 3. Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.medicine.price * item.quantity;
    }, 0);

    const shippingFee = 60;
    const total = subtotal + shippingFee;

    // 4. Create order
    const order = await tx.orders.create({
      data: {
        total,
        customerId: userId,
        status: OrderStatus.PENDING,
        items: {
          create: cartItems.map((item) => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
            price: item.medicine.price,
          })),
        },
      },
      include: {
        items: {
          include: { medicine: true },
        },
      },
    });


    // 5. Clear user's cart
    await tx.cartItem.deleteMany({ where: { userId } });

    // 7. Create order history log
    // await tx.orderHistory.create({
    //   data: {
    //     orderId: order.id,
    //     status: OrderStatus.PENDING,
    //     note: "Order placed successfully",
    //     changedBy: userId,
    //   },
    // });

    return order;
  });
};

const getUsersOrder = async (userId: string, query: OrderQueryParams = {}) => {
  const { page = "1", limit = "10", status, startDate, endDate } = query;

  const pageNumber = Math.max(1, Number(page));
  const limitNumber = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNumber - 1) * limitNumber;

  // Build where condition
  const whereCondition: any = { customerId: userId };

  if (status) {
    whereCondition.status = status;
  }

  if (startDate || endDate) {
    whereCondition.createdAt = {};
    if (startDate) whereCondition.createdAt.gte = new Date(startDate);
    if (endDate) whereCondition.createdAt.lte = new Date(endDate);
  }

  const [orders, total] = await Promise.all([
    prisma.orders.findMany({
      where: whereCondition,
      include: {
        items: {
          include: {
            medicine: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNumber,
    }),
    prisma.orders.count({ where: whereCondition }),
  ]);

  return {
    data: orders,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
      hasNext: pageNumber < Math.ceil(total / limitNumber),
      hasPrev: pageNumber > 1,
    },
  };
};

// Get seller's orders (medicines they sold)
const fetchSellerOrders = async (
  sellerId: string,
  query: OrderQueryParams = {},
) => {
  const { page = "1", limit = "10", status } = query;

  const pageNumber = Math.max(1, Number(page));
  const limitNumber = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNumber - 1) * limitNumber;

  const whereCondition: any = {
    items: {
      some: {
        medicine: { sellerId },
      },
    },
  };

  if (status) {
    whereCondition.status = status;
  }

  const [orders, total] = await Promise.all([
    prisma.orders.findMany({
      where: whereCondition,
      include: {
        items: {
          include: {
            medicine: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true,
              },
            },
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNumber,
    }),
    prisma.orders.count({ where: whereCondition }),
  ]);

  return {
    data: orders,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
    },
  };
};
const updateOrderStatus = async (
  payload: UpdateOrderStatusPayload,
  userId: string,
  userRole: string,
) => {
  const { orderId, status, note } = payload;

  return await prisma.$transaction(async (tx) => {
    // Get current order
    const order = await tx.orders.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    // Check authorization
    if (userRole === "SELLER") {
      // Verify seller owns at least one medicine in this order
      const sellerOrder = await tx.orders.findFirst({
        where: {
          id: orderId,
          items: {
            some: {
              medicine: { sellerId: userId },
            },
          },
        },
      });
      if (!sellerOrder) {
        throw new AppError(403, "You are not authorized to update this order");
      }
    }

    const oldStatus = order.status;

    // Define valid transitions
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
      [OrderStatus.COMPLETED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    // Check if transition is valid
    if (!validTransitions[oldStatus]?.includes(status)) {
      throw new AppError(
        400,
        `Invalid status transition from ${oldStatus} to ${status}`,
      );
    }

    // If cancelling, restore stock
    if (status === OrderStatus.CANCELLED) {
      for (const item of order.items) {
        await tx.medicines.update({
          where: { id: item.medicineId },
          data: { stock: { increment: item.quantity } },
        });
      }
    }

    // Update order status
    const updatedOrder = await tx.orders.update({
      where: { id: orderId },
      data: { status },
    });

    // Log status change
    // await tx.orderHistory.create({
    //   data: {
    //     orderId,
    //     status,
    //     note: note || `Order status changed from ${oldStatus} to ${status}`,
    //     changedBy: userId,
    //   },
    // });

    return updatedOrder;
  });
};

// Admin: Get all orders with filters
const fetchAllOrdersForAdmin = async (query: OrderQueryParams = {}) => {
  const { page = "1", limit = "10", status, startDate, endDate } = query;

  const pageNumber = Math.max(1, Number(page));
  const limitNumber = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNumber - 1) * limitNumber;

  const whereCondition: any = {};

  if (status) {
    whereCondition.status = status;
  }

  if (startDate || endDate) {
    whereCondition.createdAt = {};
    if (startDate) whereCondition.createdAt.gte = new Date(startDate);
    if (endDate) whereCondition.createdAt.lte = new Date(endDate);
  }

  const [orders, total] = await Promise.all([
    prisma.orders.findMany({
      where: whereCondition,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            medicine: {
              select: {
                id: true,
                name: true,
                price: true,
                seller: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNumber,
    }),
    prisma.orders.count({ where: whereCondition }),
  ]);

  // Calculate total revenue
  const revenueResult = await prisma.orders.aggregate({
    where: whereCondition,
    _sum: { total: true },
  });
  const revenue = revenueResult._sum.total || 0;

  return {
    data: orders,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
      totalRevenue: revenue,
    },
  };
};

// Get order statistics for dashboard
const getOrderStats = async (userId: string, userRole: string) => {
  let whereCondition = {};

  if (userRole === "SELLER") {
    whereCondition = {
      items: {
        some: {
          medicine: { sellerId: userId },
        },
      },
    };
  } else if (userRole === "CUSTOMER") {
    whereCondition = { customerId: userId };
  }

  const [
    totalOrders,
    completedOrders,
    pendingOrders,
    cancelledOrders,
    totalRevenue,
  ] = await Promise.all([
    prisma.orders.count({ where: whereCondition }),
    prisma.orders.count({
      where: { ...whereCondition, status: OrderStatus.COMPLETED },
    }),
    prisma.orders.count({
      where: { ...whereCondition, status: OrderStatus.PENDING },
    }),
    prisma.orders.count({
      where: { ...whereCondition, status: OrderStatus.CANCELLED },
    }),
    prisma.orders.aggregate({
      where: { ...whereCondition, status: OrderStatus.COMPLETED },
      _sum: { total: true },
    }),
  ]);

  return {
    totalOrders,
    completedOrders,
    pendingOrders,
    cancelledOrders,
    totalRevenue: totalRevenue._sum.total || 0,
  };
};

export const orderService = {
  createOrder,
  getUsersOrder,
  fetchSellerOrders,
  updateOrderStatus,
  fetchAllOrdersForAdmin,
  getOrderStats,
};
