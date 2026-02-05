"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineRouter = void 0;
const express_1 = __importDefault(require("express"));
const medicine_controller_1 = require("./medicine.controller");
const verifyRole_1 = __importStar(require("../../middleware/verifyRole"));
const router = express_1.default.Router();
router.post('/', (0, verifyRole_1.default)(verifyRole_1.UserRole.ADMIN, verifyRole_1.UserRole.SELLER), medicine_controller_1.medicineController.createMedicine);
router.get('/', medicine_controller_1.medicineController.getMedicine);
// get your all medicine
router.get('/my', (0, verifyRole_1.default)(verifyRole_1.UserRole.ADMIN, verifyRole_1.UserRole.SELLER), medicine_controller_1.medicineController.getMyMedicine);
router.get('/:id', medicine_controller_1.medicineController.getMedicineById);
// update your medicine
router.patch('/', (0, verifyRole_1.default)(verifyRole_1.UserRole.ADMIN, verifyRole_1.UserRole.SELLER), medicine_controller_1.medicineController.updateMedicine);
// delete your medicine
router.delete('/:id', (0, verifyRole_1.default)(verifyRole_1.UserRole.ADMIN, verifyRole_1.UserRole.SELLER), medicine_controller_1.medicineController.deleteMedicine);
// main shop filters ----------------------------------
// router.get("/", medicineController.getMedicines);
exports.medicineRouter = router;
//# sourceMappingURL=medicine.router.js.map