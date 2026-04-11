import express, { Router } from 'express';
import verifyRole from '../../middleware/authenticate_requireRole.js';
import { UserRole } from '@prisma/client';
import { orderController } from './order.controller.js';




const router = express.Router();

router.get("/",verifyRole(UserRole.CUSTOMER,UserRole.ADMIN), orderController.getUsersOrder);
router.post("/",verifyRole(UserRole.CUSTOMER), orderController.createOrder);

router.get("/seller", verifyRole(UserRole.SELLER), orderController.fetchSellerOrders);
router.patch("/status", verifyRole(UserRole.SELLER), orderController.updateOrderStatus);

router.get("/admin", verifyRole(UserRole.ADMIN), orderController.fetchAllOrdersForAdmin);


export const orderRouter = router;