import express, { Application } from "express";
import cors from 'cors';
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
const app: Application = express()


app.use(cors({
  origin: [process.env.APP_URL || "http://localhost:3000"], // client side url
  credentials: true
}));
app.use(express.json());


app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get('/', (req, res) => {
  res.send('Medi Store Server Running!')
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

