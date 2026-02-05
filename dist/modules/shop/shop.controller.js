"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopController = void 0;
const shop_service_1 = require("./shop.service");
const getAllShopItems = async (req, res) => {
    try {
        // business logic here
        const result = await shop_service_1.shopService.getAllShopItems();
        res.status(201).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: " Operation failed",
            details: e
        });
    }
};
//  UserCart
const upsertUserCart = async (req, res) => {
    try {
        const { id } = req.params; // medicine id here
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // business logic here
        const result = await shop_service_1.shopService.upsertUserCart(id, userId);
        res.status(201).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: " Operation failed",
            details: e
        });
    }
};
exports.shopController = {
    getAllShopItems,
    upsertUserCart
};
//# sourceMappingURL=shop.controller.js.map