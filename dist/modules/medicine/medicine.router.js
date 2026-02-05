import express from "express";
import { medicineController } from "./medicine.controller.js";
import verifyRole, { UserRole } from "../../middleware/verifyRole.js";
const router = express.Router();
router.post("/", verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.createMedicine);
router.get("/", medicineController.getMedicine);
// get your all medicine
router.get("/my", verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.getMyMedicine);
router.get("/:id", medicineController.getMedicineById);
// update your medicine
router.patch("/", verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.updateMedicine);
// delete your medicine
router.delete("/:id", verifyRole(UserRole.ADMIN, UserRole.SELLER), medicineController.deleteMedicine);
// main shop filters ----------------------------------
// router.get("/", medicineController.getMedicines);
export const medicineRouter = router;
//# sourceMappingURL=medicine.router.js.map