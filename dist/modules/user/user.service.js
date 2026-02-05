"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllUsers = async () => {
    return prisma_1.prisma.user.findMany();
};
const banUser = async (userId, stat) => {
    return prisma_1.prisma.user.update({
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
    return prisma_1.prisma.user.update({
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
    return prisma_1.prisma.user.delete({
        where: { id: userId },
    });
};
exports.userService = {
    getAllUsers,
    banUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.service.js.map