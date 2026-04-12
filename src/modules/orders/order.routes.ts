import express, { Router } from 'express';

import { orderController } from './order.controller.js';
import { UserRole } from '../../generated/client/index.js';
import { authenticate, requireRole } from '../../middleware/authenticate_requireRole.js';


const router = express.Router();

// All order routes require authentication
router.use(authenticate);

// Customer routes
router.get("/", requireRole(UserRole.CUSTOMER), orderController.getUsersOrder);
router.post("/", requireRole(UserRole.CUSTOMER), orderController.createOrder);

// Seller routes
router.get("/seller/orders", requireRole(UserRole.SELLER), orderController.fetchSellerOrders);
router.patch("/status", requireRole(UserRole.SELLER), orderController.updateOrderStatus);

// Admin routes
router.get("/admin/all", requireRole(UserRole.ADMIN), orderController.fetchAllOrdersForAdmin);
router.get("/admin/stats", requireRole(UserRole.ADMIN), orderController.getOrderStats);


export const orderRouter = router;