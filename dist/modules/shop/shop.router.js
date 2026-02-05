"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRouter = void 0;
const express_1 = __importDefault(require("express"));
const shop_controller_1 = require("./shop.controller");
const router = express_1.default.Router();
router.get('/', shop_controller_1.shopController.getAllShopItems);
//  UserCart
router.get('/', shop_controller_1.shopController.upsertUserCart);
exports.shopRouter = router;
//# sourceMappingURL=shop.router.js.map