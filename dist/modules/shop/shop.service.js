"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllShopItems = () => {
    return prisma_1.prisma.medicines.findMany();
};
//  UserCart service
const upsertUserCart = async (medicineId, userId) => {
    const upsertCart = await prisma_1.prisma.cartItem.upsert({
        where: {
            userId_medicineId: {
                userId,
                medicineId
            },
        },
        update: {
            quantity: {
                increment: 1
            }
        },
        create: {
            userId,
            medicineId,
            quantity: 1
        }
    });
    return upsertCart;
};
exports.shopService = {
    getAllShopItems,
    upsertUserCart
};
//# sourceMappingURL=shop.service.js.map