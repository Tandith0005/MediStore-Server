import { Router } from "express";
import { userController } from "./user.controller";
import verifyRole, { UserRole } from "../../middleware/verifyRole";
const router = Router();
router.get("/", verifyRole(UserRole.ADMIN), userController.getAllUsers);
router.patch("/ban/:userId", verifyRole(UserRole.ADMIN), userController.banUser);
router.patch("/me", verifyRole(UserRole.ADMIN, UserRole.CUSTOMER), userController.updateMe);
router.delete("/me", verifyRole(UserRole.ADMIN, UserRole.CUSTOMER), userController.deleteMe);
export const userRoutes = router;
