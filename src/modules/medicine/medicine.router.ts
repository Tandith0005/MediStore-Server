import express, { Router } from 'express';
import { medicineController } from './medicine.controller';
import verifyRole, { UserRole } from '../../middleware/verifyRole';


const router = express.Router();

router.post('/', verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.createMedicine);
router.get('/', verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.getMedicine);
// update your medicine
router.patch('/', verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.updateMedicine);
router.delete('/', verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.deleteMedicine);



export const medicineRouter = router;