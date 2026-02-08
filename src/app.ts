import express, { Application } from "express";
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
const app: Application = express();

//cors middleware
app.use(
  cors({
    origin: "https://level-2-assignment-4-blue.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "cookie"],
  }),
);

app.use(express.json());

app.all("/api/auth/{*any}", toNodeHandler(auth));
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

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.use(notFound);

export default app;