import { shopService } from './shop.service.js';
import { Request, Response } from 'express';

const getAllShopItems = async (req: Request, res: Response) => {
    try {
     
        // business logic here
        const result = await shopService.getAllShopItems();
        res.status(201).json(result)
    } catch (e) {
        res.status(400).json({
            error: " Operation failed",
            details: e
        })
    }
};

//  UserCart
const upsertUserCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // medicine id here
        const userId = req.user!.id 
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
     
        // business logic here
        const result = await shopService.upsertUserCart(id as string, userId as string);
        res.status(201).json(result)
    } catch (e) {
        res.status(400).json({
            error: " Operation failed",
            details: e
        })
    }
};

export const shopController={
    getAllShopItems,
    upsertUserCart
};