import "dotenv/config";
import express from "express";
import cors from "cors";
import { notFound } from "./middleware/notFound.js";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { medicineRouter } from "./modules/medicine/medicine.router.js";
import { shopRouter } from "./modules/shop/shop.router.js";
import { cartRouter } from "./modules/cart/cart.router.js";
import { userRoutes } from "./modules/user/user.routes.js";
import { dashboardRouter } from "./modules/dashboard/dashboard.route.js";
import { orderRouter } from "./modules/orders/order.routes.js";
import { categoryRouter } from "./modules/category/category.routes.js";
const app = express();
app.use(cors({
    origin: [process.env.APP_URL || "http://localhost:3000"], // client side url
    credentials: true,
}));
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Medi Store Server Running!");
});
app.use("/api/shop", shopRouter);
app.use("/api/cart", cartRouter);
app.use("/api/medicine", medicineRouter);
app.use("/api/user", userRoutes);
app.use("/api/adminDashboard-stats", dashboardRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoryRouter);
app.use(notFound);
export default app;
//# sourceMappingURL=app.js.map