// server/routes/dashboard.route.ts
import { Router } from "express";
import { dashboardController } from "./dashboard.controller";
const router = Router();
// GET adminDashboard-stats
router.get("/", dashboardController.dashboardStatsController);
export const dashboardRouter = router;
