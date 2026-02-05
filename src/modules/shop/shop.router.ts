import express, { Router } from "express";
import { shopController } from "./shop.controller.js";

const router = express.Router();

router.get("/", shopController.getAllShopItems);
//  UserCart
router.get("/", shopController.upsertUserCart);

export const shopRouter = router;
