import status from 'http-status';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { shopService } from './shop.service.js';
import { Request, Response } from 'express';


const getAllShopItems = catchAsync(async (req: Request, res: Response) => {
    const result = await shopService.getAllShopItems();
    
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Shop items retrieved successfully',
        data: result
    });
});

//  UserCart
const upsertUserCart = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params; // medicine id
    const userId = req.user!.id;
    
    if (!userId) {
        return sendResponse(res, {
            statusCode: status.UNAUTHORIZED,
            success: false,
            message: 'Unauthorized - Please log in'
        });
    }
    
    const result = await shopService.upsertUserCart(id as string, userId);
    
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Cart updated successfully',
        data: result
    });
});


export const shopController={
    getAllShopItems,
    upsertUserCart
};