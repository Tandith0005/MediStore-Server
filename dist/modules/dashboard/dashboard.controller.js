import { dashboardService } from "./dashboard.service.js";
const dashboardStatsController = async (req, res) => {
    try {
        const stats = await dashboardService.getDashboardStats();
        res.json(stats);
    }
    catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
};
export const dashboardController = {
    dashboardStatsController,
};
//# sourceMappingURL=dashboard.controller.js.map