import express, { Router } from 'express';
import { categoryController } from './category.controller.js';
import { UserRole } from '../../generated/client/index.js';
import { authenticate, requireRole } from '../../middleware/authenticate_requireRole.js';


const router = express.Router();

router.get("/",authenticate, categoryController.getCategories);
router.post("/",authenticate, requireRole(UserRole.ADMIN), categoryController.createCategory);



export const categoryRouter = router;