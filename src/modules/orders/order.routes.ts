import express, { Router } from 'express';

import verifyRole, { UserRole } from '../../middleware/verifyRole';
import { orderController } from './order.controller';


const router = express.Router();

router.get('/',verifyRole(UserRole.CUSTOMER,UserRole.ADMIN), orderController.getUsersOrder);
router.post('/',verifyRole(UserRole.CUSTOMER), orderController.createOrder);

router.get("/seller", verifyRole(UserRole.SELLER), orderController.fetchSellerOrders);
router.patch("/status", verifyRole(UserRole.SELLER), orderController.updateOrderStatus);




export const orderRouter = router;