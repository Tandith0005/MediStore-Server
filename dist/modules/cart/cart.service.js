"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const prisma_1 = require("../../lib/prisma");
// get cart
const getCart = async (userId) => {
    const cart = await prisma_1.prisma.cartItem.findMany({
        where: { userId },
        include: { medicine: true },
    });
    return cart;
};
//  UserCart service
const upsertUserCart = async (medicineId, userId) => {
    const upsertCart = await prisma_1.prisma.cartItem.upsert({
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
    const upsertCart = await prisma_1.prisma.cartItem.upsert({
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
    const result = await prisma_1.prisma.cartItem.deleteMany({
        where: {
            id,
            userId,
        },
    });
    return result;
};
exports.cartService = {
    getCart,
    upsertUserCart,
    minusUserCart,
    deleteItemsInCart
};
//# sourceMappingURL=cart.service.js.map