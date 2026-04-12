// cart.controller.ts - Professional version
import { Request, Response } from "express";
import { cartService } from "./cart.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import status from "http-status";

const getCart = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const result = await cartService.getCart(req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Cart fetched successfully",
    data: result,
  });
});

const getCartItemCount = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const result = await cartService.getCartItemCount(req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Cart count fetched successfully",
    data: result,
  });
});

const upsertUserCart = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const { medicineId } = req.params;
  const result = await cartService.upsertUserCart(medicineId as string, req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Item added to cart",
    data: result,
  });
});

const minusUserCart = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const { medicineId } = req.params;
  const result = await cartService.minusUserCart(medicineId as string, req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Cart updated successfully",
    data: result,
  });
});

const updateCartItemQuantity = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const { id } = req.params;
  const { quantity } = req.body;
  
  const result = await cartService.updateCartItemQuantity(id as string, quantity, req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Cart updated successfully",
    data: result,
  });
});

const deleteItemsInCart = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const { id } = req.params;
  const result = await cartService.deleteItemsInCart(id as string, req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Item removed from cart",
    data: result,
  });
});

const clearCart = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const result = await cartService.clearCart(req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Cart cleared successfully",
    data: result,
  });
});

export const cartController = {
  getCart,
  getCartItemCount,
  updateCartItemQuantity,
  upsertUserCart,
  minusUserCart,
  deleteItemsInCart,
  clearCart,
};