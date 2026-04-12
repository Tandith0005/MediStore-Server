// modules/orders/order.controller.ts
import { Request, Response } from "express";
import { orderService } from "./order.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import status from "http-status";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const result = await orderService.createOrder({ userId: req.user.id });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Order placed successfully",
    data: result,
  });
});

const getUsersOrder = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const result = await orderService.getUsersOrder(req.user.id, req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Orders fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});


const fetchSellerOrders = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "SELLER") {
    return sendResponse(res, {
      statusCode: status.FORBIDDEN,
      success: false,
      message: "Forbidden - Seller access required",
    });
  }

  const result = await orderService.fetchSellerOrders(req.user.id, req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Orders fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const result = await orderService.updateOrderStatus(
    req.body,
    req.user.id,
    req.user.role
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Order status updated successfully",
    data: result,
  });
});

const fetchAllOrdersForAdmin = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return sendResponse(res, {
      statusCode: status.FORBIDDEN,
      success: false,
      message: "Forbidden - Admin access required",
    });
  }

  const result = await orderService.fetchAllOrdersForAdmin(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All orders fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getOrderStats = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const result = await orderService.getOrderStats(req.user.id, req.user.role);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Order statistics fetched successfully",
    data: result,
  });
});

export const orderController = {
  createOrder,
  getUsersOrder,
  fetchSellerOrders,
  updateOrderStatus,
  fetchAllOrdersForAdmin,
  getOrderStats,
};