import express, { Router } from 'express';
import { cartController } from './cart.controller';
import verifyRole, { UserRole } from '../../middleware/verifyRole';


const router = express.Router();

router.get("/",verifyRole(UserRole.CUSTOMER), cartController.getCart);
//  UserCart
router.patch("/:medicineId",verifyRole(UserRole.CUSTOMER), cartController.upsertUserCart);
router.patch("/minus/:medicineId",verifyRole(UserRole.CUSTOMER), cartController.minusUserCart);
// deleteItemsInCart
router.delete("/:id",verifyRole(UserRole.CUSTOMER), cartController.deleteItemsInCart);




export const cartRouter = router;