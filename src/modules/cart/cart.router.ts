import express, { Router } from 'express';
import { cartController } from './cart.controller.js';
import { authenticate, requireRole } from '../../middleware/authenticate_requireRole.js';
import { UserRole } from '../../generated/client/index.js';



const router = express.Router();

router.get("/",authenticate, requireRole(UserRole.CUSTOMER), cartController.getCart);
//  UserCart
router.patch("/:medicineId",authenticate, requireRole(UserRole.CUSTOMER), cartController.upsertUserCart);
router.patch("/minus/:medicineId",authenticate, requireRole(UserRole.CUSTOMER), cartController.minusUserCart);
// deleteItemsInCart
router.delete("/:id",authenticate, requireRole(UserRole.CUSTOMER), cartController.deleteItemsInCart);




export const cartRouter = router;