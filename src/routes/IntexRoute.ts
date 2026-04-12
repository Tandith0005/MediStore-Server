import { Router } from "express";

import { medicineRouter } from "../modules/medicine/medicine.router.js";
import { cartRouter } from "../modules/cart/cart.router.js";
import { userRoutes } from "../modules/user/user.routes.js";
import { dashboardRouter } from "../modules/dashboard/dashboard.route.js";
import { orderRouter } from "../modules/orders/order.routes.js";
import { categoryRouter } from "../modules/category/category.routes.js";
import { reviewRouter } from "../modules/review/review.router.js";

const router = Router();


// versioning routes
router.use("/medicine", medicineRouter);
router.use("/cart", cartRouter);
router.use("/reviews", reviewRouter);
router.use("/user", userRoutes);
router.use("/dashboard", dashboardRouter);
router.use("/orders", orderRouter);
router.use("/categories", categoryRouter);

export const IndexRoutes = router;