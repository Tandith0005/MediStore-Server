import { prisma } from "../../lib/prisma.js";
const getAllUsers = async () => {
    return prisma.user.findMany();
};
const banUser = async (userId, stat) => {
    return prisma.user.update({
        where: { id: userId },
        data: { status: stat },
    });
};
const updateUser = async (userId, payload) => {
    const allowedData = {
        ...(payload.name && { name: payload.name }),
        ...(payload.phone && { phone: payload.phone }),
        ...(payload.address && { address: payload.address }),
    };
    return prisma.user.update({
        where: { id: userId },
        data: allowedData,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
};
const deleteUser = async (userId) => {
    return prisma.user.delete({
        where: { id: userId },
    });
};
export const userService = {
    getAllUsers,
    banUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.service.js.map