import express from 'express';
import verifyRole, { UserRole } from '../../middleware/verifyRole';
import { categoryController } from './category.controller';
const router = express.Router();
router.get("/", verifyRole(UserRole.ADMIN), categoryController.getCategories);
router.post("/", verifyRole(UserRole.ADMIN), categoryController.createCategory);
export const categoryRouter = router;
