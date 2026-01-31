import express, { Router } from 'express';
import { medicineController } from './medicine.controller';
import verifyRole, { UserRole } from '../../middleware/verifyRole';


const router = express.Router();

router.post('/', verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.createMedicine);
router.get('/',  medicineController.getMedicine);
router.get('/:id',  medicineController.getMedicineById);
// get your all medicine
router.get('/my', verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.getMyMedicine);
// update your medicine
router.patch('/', verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.updateMedicine);
// delete your medicine
router.delete('/:id', verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.deleteMedicine);



export const medicineRouter = router;