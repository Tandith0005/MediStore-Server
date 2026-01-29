import express, { Router } from 'express';
import { shopController } from './shop.controller';


const router = express.Router();

router.get('/', shopController.getAllShopItems);



export const medicineRouter = router;