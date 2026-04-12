// modules/dashboard/dashboard.controller.ts
import { Request, Response } from "express";
import { dashboardService } from "./dashboard.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import status from "http-status";

const getAdminDashboard = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return sendResponse(res, {
      statusCode: status.FORBIDDEN,
      success: false,
      message: "Admin access required",
    });
  }

  const stats = await dashboardService.getAdminDashboardStats();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin dashboard stats fetched successfully",
    data: stats,
  });
});

const getSellerDashboard = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "SELLER") {
    return sendResponse(res, {
      statusCode: status.FORBIDDEN,
      success: false,
      message: "Seller access required",
    });
  }

  const stats = await dashboardService.getSellerDashboardStats(req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Seller dashboard stats fetched successfully",
    data: stats,
  });
});

const getCustomerDashboard = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "CUSTOMER") {
    return sendResponse(res, {
      statusCode: status.FORBIDDEN,
      success: false,
      message: "Customer access required",
    });
  }

  const stats = await dashboardService.getCustomerDashboardStats(req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Customer dashboard stats fetched successfully",
    data: stats,
  });
});

export const dashboardController = {
  getAdminDashboard,
  getSellerDashboard,
  getCustomerDashboard,
};