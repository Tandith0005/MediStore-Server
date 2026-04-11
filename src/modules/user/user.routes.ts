import { Router } from "express";
import { userController } from "./user.controller.js";
import { UserRole } from "../../generated/client/index.js";
import {
  authenticate,
  requireRole,
} from "../../middleware/authenticate_requireRole.js";

const router = Router();

// ADMIN ONLY
router.get(
  "/",
  authenticate,
  requireRole(UserRole.ADMIN),
  userController.getAllUsers,
);
router.patch(
  "/ban/:userId",
  authenticate,
  requireRole(UserRole.ADMIN),
  userController.banUser,
);
router.patch(
  "/unban/:userId",
  authenticate,
  requireRole(UserRole.ADMIN),
  userController.banUser,
);

// AUTHENTICATED USERS (ADMIN + CUSTOMER)
router.patch(
  "/me",
  authenticate,
  requireRole(UserRole.ADMIN, UserRole.CUSTOMER),
  userController.updateMe,
);

router.delete(
  "/me",
  authenticate,
  requireRole(UserRole.ADMIN, UserRole.CUSTOMER),
  userController.deleteMe,
);

export const userRoutes = router;
