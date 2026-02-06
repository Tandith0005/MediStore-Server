import { cartService } from './cart.service.js';
// get cart
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // business logic here
        const result = await cartService.getCart(userId);
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
        const result = await cartService.upsertUserCart(medicineId, userId);
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
        const result = await cartService.minusUserCart(medicineId, userId);
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
        const result = await cartService.deleteItemsInCart(id, userId);
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
export const cartController = {
    getCart,
    upsertUserCart,
    minusUserCart,
    deleteItemsInCart
};
//# sourceMappingURL=cart.controller.js.map