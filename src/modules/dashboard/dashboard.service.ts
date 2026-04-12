// modules/dashboard/dashboard.service.ts
import { prisma } from "../../lib/prisma.js";
import { OrderStatus } from "../../generated/client/index.js";
import AppError from "../../utils/AppError.js";

// Admin Dashboard Stats
const getAdminDashboardStats = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 7);

  const [
    totalUsers,
    activeUsers,
    deletedUsers,
    totalSellers,
    totalCustomers,
    totalMedicines,
    outOfStockMedicines,
    totalOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    totalRevenue,
    monthlyRevenue,
    weeklyRevenue,
    categoryStats,
    recentOrders,
    recentUsers,
    lowStockProducts,
    topProducts,
  ] = await Promise.all([
    // User stats
    prisma.user.count(),
    prisma.user.count({ where: { isDeleted: false } }),
    prisma.user.count({ where: { isDeleted: true } }),
    prisma.user.count({ where: { role: "SELLER" } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    
    // Product stats
    prisma.medicines.count(),
    prisma.medicines.count({ where: { stock: 0 } }),
    
    // Order stats
    prisma.orders.count(),
    prisma.orders.count({ where: { status: OrderStatus.PENDING } }),
    prisma.orders.count({ where: { status: OrderStatus.COMPLETED } }),
    prisma.orders.count({ where: { status: OrderStatus.CANCELLED } }),
    
    // Revenue stats
    prisma.orders.aggregate({
      where: { status: OrderStatus.COMPLETED },
      _sum: { total: true },
    }),
    prisma.orders.aggregate({
      where: {
        status: OrderStatus.COMPLETED,
        createdAt: { gte: startOfMonth },
      },
      _sum: { total: true },
    }),
    prisma.orders.aggregate({
      where: {
        status: OrderStatus.COMPLETED,
        createdAt: { gte: startOfWeek },
      },
      _sum: { total: true },
    }),
    
    // Category stats
    prisma.category.findMany({
      include: {
        _count: {
          select: { medicines: true },
        },
      },
    }),
    
    // Recent orders
    prisma.orders.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { name: true, email: true } },
        _count: { select: { items: true } },
      },
    }),
    
    // Recent users
    prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
    
    // Low stock products
    prisma.medicines.findMany({
      where: { stock: { lt: 10 } },
      take: 10,
      orderBy: { stock: "asc" },
      select: {
        id: true,
        name: true,
        stock: true,
        price: true,
        seller: { select: { name: true } },
      },
    }),
    
    // Top selling products
    prisma.orderItem.groupBy({
      by: ["medicineId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 10,
    }),
  ]);

  // Get product details for top products
  const topProductsWithDetails = await Promise.all(
    topProducts.map(async (item) => {
      const medicine = await prisma.medicines.findUnique({
        where: { id: item.medicineId },
        select: { id: true, name: true, price: true, image: true },
      });
      return {
        ...medicine,
        totalSold: item._sum.quantity || 0,
        revenue: (medicine?.price || 0) * (item._sum.quantity || 0),
      };
    })
  );

  // Calculate revenue trends (last 7 days)
  const revenueTrend = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    
    const dayRevenue = await prisma.orders.aggregate({
      where: {
        status: OrderStatus.COMPLETED,
        createdAt: { gte: date, lt: nextDate },
      },
      _sum: { total: true },
    });
    
    revenueTrend.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue: dayRevenue._sum.total || 0,
    });
  }

  return {
    overview: {
      totalUsers,
      activeUsers,
      deletedUsers,
      totalSellers,
      totalCustomers,
      totalProducts: totalMedicines,
      outOfStockProducts: outOfStockMedicines,
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      monthlyRevenue: monthlyRevenue._sum.total || 0,
      weeklyRevenue: weeklyRevenue._sum.total || 0,
      averageOrderValue: totalOrders > 0 ? (totalRevenue._sum.total || 0) / totalOrders : 0,
    },
    charts: {
      revenueTrend,
      categoryDistribution: categoryStats.map(cat => ({
        name: cat.name,
        count: cat._count.medicines,
      })),
      topProducts: topProductsWithDetails,
    },
    recent: {
      recentOrders,
      recentUsers,
      lowStockProducts,
    },
  };
};

// Seller Dashboard Stats
const getSellerDashboardStats = async (sellerId: string) => {
  // Get seller's products
  const sellerProducts = await prisma.medicines.findMany({
    where: { sellerId },
    select: { id: true },
  });
  
  const productIds = sellerProducts.map(p => p.id);

  if (productIds.length === 0) {
    return {
      overview: {
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalCustomers: 0,
        averageRating: 0,
      },
      charts: {
        revenueTrend: [],
        topProducts: [],
      },
      recent: {
        recentOrders: [],
        lowStockProducts: [],
        recentReviews: [],
      },
    };
  }

  // Get orders containing seller's products
  const sellerOrders = await prisma.orderItem.findMany({
    where: {
      medicineId: { in: productIds },
      order: { status: OrderStatus.COMPLETED },
    },
    include: {
      order: true,
      medicine: true,
    },
  });

  const orderIds = [...new Set(sellerOrders.map(o => o.orderId))];
  
  const [
    totalRevenue,
    totalOrders,
    uniqueCustomers,
    productStats,
    lowStockProducts,
    recentOrders,
    recentReviews,
  ] = await Promise.all([
    // Revenue
    Promise.resolve(sellerOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0)),
    
    // Order count
    Promise.resolve(orderIds.length),
    
    // Unique customers
    prisma.orders.findMany({
      where: { id: { in: orderIds } },
      distinct: ["customerId"],
      select: { customerId: true },
    }),
    
    // Product stats
    prisma.medicines.findMany({
      where: { sellerId },
      include: {
        _count: { select: { orderItems: true, reviews: true } },
        reviews: { select: { rating: true } },
      },
    }),
    
    // Low stock
    prisma.medicines.findMany({
      where: { sellerId, stock: { lt: 10 } },
      select: { id: true, name: true, stock: true, price: true },
    }),
    
    // Recent orders
    prisma.orders.findMany({
      where: { id: { in: orderIds } },
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { name: true, email: true } },
        items: {
          where: { medicineId: { in: productIds } },
          include: { medicine: { select: { name: true } } },
        },
      },
    }),
    
    // Recent reviews
    prisma.reviews.findMany({
      where: { medicineId: { in: productIds } },
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, image: true } },
        medicine: { select: { name: true } },
      },
    }),
  ]);

  // Calculate average rating
  let totalRating = 0;
  let totalReviews = 0;
  productStats.forEach(product => {
    product.reviews.forEach(review => {
      totalRating += review.rating;
      totalReviews++;
    });
  });
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  // Top products
  const topProducts = productStats
    .map(product => ({
      id: product.id,
      name: product.name,
      sold: product._count.orderItems,
      revenue: product.price * product._count.orderItems,
      rating: product.reviews.length > 0 
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length 
        : 0,
    }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 10);

  return {
    overview: {
      totalRevenue,
      totalOrders,
      totalProducts: productStats.length,
      totalCustomers: uniqueCustomers.length,
      averageRating: Number(averageRating.toFixed(1)),
    },
    charts: {
      revenueTrend: [], // Can be implemented similarly to admin
      topProducts,
    },
    recent: {
      recentOrders,
      lowStockProducts,
      recentReviews,
    },
  };
};

// Customer Dashboard Stats
const getCustomerDashboardStats = async (userId: string) => {
  const [orderAggregate, ordersByStatus, totalReviews, recentOrders] =
    await Promise.all([
      // Total orders + total spent
      prisma.orders.aggregate({
        where: { customerId: userId },
        _count: true,
        _sum: { total: true },
      }),
      // Orders grouped by status
      prisma.orders.groupBy({
        by: ["status"],
        where: { customerId: userId },
        _count: true,
      }),
      // Review count
      prisma.reviews.count({
        where: { userId },
      }),
      // Recent orders
      prisma.orders.findMany({
        where: { customerId: userId },
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              medicine: { select: { name: true, image: true } },
            },
          },
        },
      }),
    ]);

  const statusCounts = {
    pending:   ordersByStatus.find(s => s.status === OrderStatus.PENDING)?._count   || 0,
    completed: ordersByStatus.find(s => s.status === OrderStatus.COMPLETED)?._count || 0,
    cancelled: ordersByStatus.find(s => s.status === OrderStatus.CANCELLED)?._count || 0,
  };

  return {
    overview: {
      totalOrders:      orderAggregate._count,
      totalSpent:       orderAggregate._sum.total || 0,
      totalReviews,
      pendingOrders:    statusCounts.pending,
      completedOrders:  statusCounts.completed,
      cancelledOrders:  statusCounts.cancelled,
    },
    recentOrders,
  };
};

export const dashboardService = {
  getAdminDashboardStats,
  getSellerDashboardStats,
  getCustomerDashboardStats,
};