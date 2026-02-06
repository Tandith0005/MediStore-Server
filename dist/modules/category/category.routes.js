import express from 'express';
import verifyRole from '../../middleware/verifyRole.js';
import { categoryController } from './category.controller.js';
import { UserRole } from '@prisma/client';
const router = express.Router();
router.get("/", verifyRole(UserRole.ADMIN), categoryController.getCategories);
router.post("/", verifyRole(UserRole.ADMIN), categoryController.createCategory);
export const categoryRouter = router;
//# sourceMappingURL=category.routes.js.map