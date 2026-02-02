import express from "express";
import cors from 'cors';
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
const app = express();
app.use(cors({
    origin: [process.env.APP_URL || "http://localhost:3000"], // client side url
    credentials: true
}));
app.use(express.json());
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/shop', shopRouter);
app.use('/cart', cartRouter);
app.use('/medicine', medicineRouter);
app.use('/user', userRoutes);
app.use('/adminDashboard-stats', dashboardRouter);
app.use("/orders", orderRouter);
app.use("/categories", categoryRouter);
app.use(notFound);
export default app;
