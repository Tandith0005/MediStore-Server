import express, { Router } from 'express';
import { cartController } from './cart.controller.js';
import { authenticate, requireRole } from '../../middleware/authenticate_requireRole.js';
import { UserRole } from '../../generated/client/index.js';



const router = express.Router();
// Get item count for badge
router.get("/count", authenticate, requireRole(UserRole.CUSTOMER), cartController.getCartItemCount);
// Get cart with summary
router.get("/",authenticate, requireRole(UserRole.CUSTOMER), cartController.getCart);

// Decrease quantity
router.patch("/minus/:medicineId",authenticate, requireRole(UserRole.CUSTOMER), cartController.minusUserCart);
// Update quantity directly
router.patch("/quantity/:id", authenticate, requireRole(UserRole.CUSTOMER), cartController.updateCartItemQuantity);
//  Add item to cart
router.patch("/:medicineId",authenticate, requireRole(UserRole.CUSTOMER), cartController.upsertUserCart);

// Clear entire cart
router.delete("/clear", authenticate, requireRole(UserRole.CUSTOMER), cartController.clearCart);
// Remove specific item
router.delete("/:id",authenticate, requireRole(UserRole.CUSTOMER), cartController.deleteItemsInCart);




export const cartRouter = router;