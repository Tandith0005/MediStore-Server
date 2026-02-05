"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
const dashboardStatsController = async (req, res) => {
    try {
        const stats = await dashboard_service_1.dashboardService.getDashboardStats();
        res.json(stats);
    }
    catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
};
exports.dashboardController = {
    dashboardStatsController,
};
//# sourceMappingURL=dashboard.controller.js.map