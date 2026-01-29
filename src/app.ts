import express, { Application } from "express";
import cors from 'cors';
import { notFound } from "./middleware/notFound";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { medicineRouter } from "./modules/medicine/medicine.router";
const app: Application = express()


app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000", // client side url
  credentials: true
}));
app.use(express.json());


app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/shop', medicineRouter);
app.use('/medicine', medicineRouter);

app.use(notFound);


export default app;

