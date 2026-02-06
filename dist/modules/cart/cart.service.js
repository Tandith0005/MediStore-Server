import { prisma } from "../../lib/prisma.js";
// get cart
const getCart = async (userId) => {
    const cart = await prisma.cartItem.findMany({
        where: { userId },
        include: { medicine: true },
    });
    return cart;
};
//  UserCart service
const upsertUserCart = async (medicineId, userId) => {
    const upsertCart = await prisma.cartItem.upsert({
        where: {
            userId_medicineId: {
                medicineId,
                userId,
            },
        },
        update: {
            quantity: {
                increment: 1,
            },
        },
        create: {
            medicineId,
            userId,
            quantity: 1,
        },
    });
    return upsertCart;
};
const minusUserCart = async (medicineId, userId) => {
    const upsertCart = await prisma.cartItem.upsert({
        where: {
            userId_medicineId: {
                medicineId,
                userId,
            },
        },
        update: {
            quantity: {
                decrement: 1,
            },
        },
        create: {
            medicineId,
            userId,
            quantity: 1,
        },
    });
    return upsertCart;
};
// deleteItemsInCart
const deleteItemsInCart = async (id, userId) => {
    const result = await prisma.cartItem.deleteMany({
        where: {
            id,
            userId,
        },
    });
    return result;
};
export const cartService = {
    getCart,
    upsertUserCart,
    minusUserCart,
    deleteItemsInCart
};
//# sourceMappingURL=cart.service.js.map