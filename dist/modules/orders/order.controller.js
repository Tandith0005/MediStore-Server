import { orderService } from './order.service';
const createOrder = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const order = await orderService.createOrder({
            userId: req.user.id
        });
        res.status(201).json(order);
    }
    catch (error) {
        console.error("ORDER ERROR:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
};
const getUsersOrder = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const orders = await orderService.getUsersOrder(req.user.id);
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("GET ORDER ERROR:", error);
        res.status(500).json({ message: "Failed to fetch order" });
    }
};
// seller orders
const fetchSellerOrders = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "SELLER") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const sellerId = req.user.id;
        const orders = await orderService.fetchSellerOrders(sellerId);
        res.json(orders);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await orderService.updateOrderStatus(orderId, status);
        res.json(order);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update order status" });
    }
};
// admin orders
const fetchAllOrdersForAdmin = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Forbidden" });
        }
        const orders = await orderService.fetchAllOrdersForAdmin();
        res.json(orders);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
export const orderController = { createOrder, getUsersOrder, fetchSellerOrders, updateOrderStatus, fetchAllOrdersForAdmin };
