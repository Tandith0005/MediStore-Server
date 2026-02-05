import express, { Application } from "express";
import cors from "cors";
import { notFound } from "./middleware/notFound";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { medicineRouter } from "./modules/medicine/medicine.router";
import { shopRouter } from "./modules/shop/shop.router";
import { cartRouter } from "./modules/cart/cart.router";
import { userRoutes } from "./modules/user/user.routes";
import { dashboardRouter } from "./modules/dashboard/dashboard.route";
import { orderRouter } from "./modules/orders/order.routes";
import { categoryRouter } from "./modules/category/category.routes";
import { config } from "dotenv";
const app: Application = express();
config();

app.use(
  cors({
    origin: [process.env.APP_URL || "http://localhost:3000"], // client side url
    credentials: true,
  }),
);
app.all("/api/auth/*any", toNodeHandler(auth));
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
