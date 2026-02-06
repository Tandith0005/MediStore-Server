import { prisma } from "../../lib/prisma.js";
// order.service.ts
const createOrder = async ({ userId }) => {
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { medicine: true },
    });
    if (cartItems.length === 0) {
        throw new Error("Cart is empty");
    }
    const subtotal = cartItems.reduce((sum, item) => {
        return sum + item.medicine.price * item.quantity;
    }, 0);
    const shippingFee = 60;
    const total = subtotal + shippingFee;
    const order = await prisma.orders.create({
        data: {
            total,
            customer: {
                connect: { id: userId },
            },
            items: {
                create: cartItems.map((item) => ({
                    medicineId: item.medicineId,
                    quantity: item.quantity,
                    price: item.medicine.price,
                })),
            },
        },
    });
    await prisma.cartItem.deleteMany({ where: { userId } });
    return order;
};
const getUsersOrder = async (userId) => {
    return await prisma.orders.findMany({
        where: { customer: { id: userId } },
        include: { items: { include: { medicine: true } } }
    });
};
// selle orders
const fetchSellerOrders = async (sellerId) => {
    const orders = await prisma.orders.findMany({
        where: {
            items: {
                some: {
                    medicine: { sellerId },
                },
            },
        },
        include: {
            items: {
                include: {
                    medicine: true,
                },
            },
            customer: true,
        },
        orderBy: { createdAt: "desc" },
    });
    return orders;
};
const updateOrderStatus = async (orderId, status) => {
    const updatedOrder = await prisma.orders.update({
        where: { id: orderId },
        data: { status },
    });
    return updatedOrder;
};
// Admin orders
const fetchAllOrdersForAdmin = async () => {
    return prisma.orders.findMany({
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
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
export const orderService = {
    createOrder,
    getUsersOrder,
    fetchSellerOrders,
    updateOrderStatus,
    fetchAllOrdersForAdmin
};
//# sourceMappingURL=order.service.js.map