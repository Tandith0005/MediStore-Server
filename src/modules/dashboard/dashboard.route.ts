// modules/dashboard/dashboard.route.ts
import { Router } from "express";
import { dashboardController } from "./dashboard.controller.js";
import { authenticate, requireRole } from "../../middleware/authenticate_requireRole.js";
import { UserRole } from "../../generated/client/index.js";

const router = Router();

// All dashboard routes require authentication
router.use(authenticate);

// Admin dashboard
router.get("/admin", requireRole(UserRole.ADMIN), dashboardController.getAdminDashboard);

// Seller dashboard
router.get("/seller", requireRole(UserRole.SELLER), dashboardController.getSellerDashboard);

// Customer dashboard
router.get("/customer", requireRole(UserRole.CUSTOMER), dashboardController.getCustomerDashboard);

export const dashboardRouter = router;