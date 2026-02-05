"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
// server/routes/dashboard.route.ts
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const router = (0, express_1.Router)();
// GET adminDashboard-stats
router.get("/", dashboard_controller_1.dashboardController.dashboardStatsController);
exports.dashboardRouter = router;
//# sourceMappingURL=dashboard.route.js.map