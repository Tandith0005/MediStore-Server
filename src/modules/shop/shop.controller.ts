import React from 'react';
import { shopService } from './shop.service';
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

export const shopController={
    getAllShopItems
};