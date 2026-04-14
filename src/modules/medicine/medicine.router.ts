import express, { Router } from 'express';
import { medicineController } from './medicine.controller.js';
import { UserRole } from '../../generated/client/index.js';
import { authenticate, requireRole } from '../../middleware/authenticate_requireRole.js';
import { upload } from '../../middleware/upload.js';



const router = express.Router();

router.post("/", authenticate, requireRole(UserRole.ADMIN, UserRole.SELLER), upload.none(), medicineController.createMedicine);
// get all medicine for shop
router.get("/",  medicineController.getMedicine);
// get your all medicine
router.get("/my", authenticate, requireRole(UserRole.ADMIN, UserRole.SELLER), medicineController.getMyMedicine);
router.get("/:id",  medicineController.getMedicineById);
// update your medicine
router.patch("/:id", authenticate, requireRole(UserRole.ADMIN, UserRole.SELLER), medicineController.updateMedicine);
// delete your medicine
router.delete("/:id", authenticate, requireRole(UserRole.ADMIN, UserRole.SELLER), medicineController.deleteMedicine);


export const medicineRouter = router;