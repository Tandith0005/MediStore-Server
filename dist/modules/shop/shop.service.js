import { prisma } from "../../lib/prisma.js";
const getAllShopItems = () => {
    return prisma.medicines.findMany();
};
//  UserCart service
const upsertUserCart = async (medicineId, userId) => {
    const upsertCart = await prisma.cartItem.upsert({
        where: {
            userId_medicineId: {
                userId,
                medicineId,
            },
        },
        update: {
            quantity: {
                increment: 1,
            },
        },
        create: {
            userId,
            medicineId,
            quantity: 1,
        },
    });
    return upsertCart;
};
export const shopService = {
    getAllShopItems,
    upsertUserCart,
};
//# sourceMappingURL=shop.service.js.map