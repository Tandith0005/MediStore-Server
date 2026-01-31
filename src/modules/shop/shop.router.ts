import express, { Router } from 'express';
import { shopController } from './shop.controller';


const router = express.Router();

router.get('/', shopController.getAllShopItems);
//  UserCart
router.get('/', shopController.upsertUserCart);



export const shopRouter = router;