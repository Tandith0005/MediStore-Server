"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = require("./middleware/notFound");
const auth_1 = require("./lib/auth");
const node_1 = require("better-auth/node");
const medicine_router_1 = require("./modules/medicine/medicine.router");
const shop_router_1 = require("./modules/shop/shop.router");
const cart_router_1 = require("./modules/cart/cart.router");
const user_routes_1 = require("./modules/user/user.routes");
const dashboard_route_1 = require("./modules/dashboard/dashboard.route");
const order_routes_1 = require("./modules/orders/order.routes");
const category_routes_1 = require("./modules/category/category.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [process.env.APP_URL || "http://localhost:3000"], // client side url
    credentials: true,
}));
app.use(express_1.default.json());
app.all("/api/auth/{*any}", (0, node_1.toNodeHandler)(auth_1.auth));
app.get("/", (req, res) => {
    res.send("Medi Store Server Running!");
});
app.use("/api/shop", shop_router_1.shopRouter);
app.use("/api/cart", cart_router_1.cartRouter);
app.use("/api/medicine", medicine_router_1.medicineRouter);
app.use("/api/user", user_routes_1.userRoutes);
app.use("/api/adminDashboard-stats", dashboard_route_1.dashboardRouter);
app.use("/api/orders", order_routes_1.orderRouter);
app.use("/api/categories", category_routes_1.categoryRouter);
app.use(notFound_1.notFound);
exports.default = app;
//# sourceMappingURL=app.js.map