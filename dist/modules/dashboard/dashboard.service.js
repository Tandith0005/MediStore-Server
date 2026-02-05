"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
const prisma_1 = require("../../lib/prisma");
const getDashboardStats = async () => {
    const totalUsers = await prisma_1.prisma.user.count();
    const totalMedicines = await prisma_1.prisma.medicines.count();
    const totalOrders = await prisma_1.prisma.orders.count();
    const categories = await prisma_1.prisma.medicines.groupBy({
        by: ["category"],
    });
    const totalCategories = categories.length;
    return {
        totalUsers,
        totalMedicines,
        totalOrders,
        totalCategories,
    };
};
exports.dashboardService = {
    getDashboardStats,
};
//# sourceMappingURL=dashboard.service.js.map