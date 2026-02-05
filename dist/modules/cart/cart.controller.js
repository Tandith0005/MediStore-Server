"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const cart_service_1 = require("./cart.service");
// get cart
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // business logic here
        const result = await cart_service_1.cartService.getCart(userId);
        res.status(201).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            error: " Operation failed",
            details: e
        });
    }
};
//  UserCart
const upsertUserCart = async (req, res) => {
    try {
        const { medicineId } = req.params; // medicine id here
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // business logic here
        const result = await cart_service_1.cartService.upsertUserCart(medicineId, userId);
        res.status(201).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            error: " Operation failed",
            details: e
        });
    }
};
const minusUserCart = async (req, res) => {
    try {
        const { medicineId } = req.params; // medicine id here
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // business logic here
        const result = await cart_service_1.cartService.minusUserCart(medicineId, userId);
        res.status(201).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            error: " Operation failed",
            details: e
        });
    }
};
const deleteItemsInCart = async (req, res) => {
    try {
        const { id } = req.params; // cart item id here
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // business logic here
        const result = await cart_service_1.cartService.deleteItemsInCart(id, userId);
        res.status(201).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            error: " Operation failed",
            details: e
        });
    }
};
exports.cartController = {
    getCart,
    upsertUserCart,
    minusUserCart,
    deleteItemsInCart
};
//# sourceMappingURL=cart.controller.js.map