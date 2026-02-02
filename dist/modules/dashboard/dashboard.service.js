import { prisma } from "../../lib/prisma";
const getDashboardStats = async () => {
    const totalUsers = await prisma.user.count();
    const totalMedicines = await prisma.medicines.count();
    const totalOrders = await prisma.orders.count();
    const categories = await prisma.medicines.groupBy({
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
export const dashboardService = {
    getDashboardStats,
};
