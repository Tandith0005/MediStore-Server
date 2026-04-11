import express, { Router } from 'express';

import { orderController } from './order.controller.js';
import { UserRole } from '../../generated/client/index.js';
import { authenticate, requireRole } from '../../middleware/authenticate_requireRole.js';




const router = express.Router();

router.get("/",authenticate, requireRole(UserRole.CUSTOMER,UserRole.ADMIN), orderController.getUsersOrder);
router.post("/",authenticate, requireRole(UserRole.CUSTOMER), orderController.createOrder);

router.get("/seller", authenticate, requireRole(UserRole.SELLER), orderController.fetchSellerOrders);
router.patch("/status", authenticate, requireRole(UserRole.SELLER), orderController.updateOrderStatus);

router.get("/admin", authenticate, requireRole(UserRole.ADMIN), orderController.fetchAllOrdersForAdmin);


export const orderRouter = router;