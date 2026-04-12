// modules/reviews/review.controller.ts
import { Request, Response } from "express";
import { reviewService } from "./review.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import status from "http-status";

const createReview = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const result = await reviewService.createReview(req.body, req.user.id);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Review submitted successfully",
    data: result,
  });
});

const getMedicineReviews = catchAsync(async (req: Request, res: Response) => {
  const { medicineId } = req.params;
  const { page, limit } = req.query;
  
  const result = await reviewService.getMedicineReviews(
    medicineId as string,
    Number(page),
    Number(limit)
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const { id } = req.params;
  const result = await reviewService.updateReview({ id, ...req.body }, req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const { id } = req.params;
  const result = await reviewService.deleteReview(id as string, req.user.id, req.user.role);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

const getMyReviews = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const { page, limit } = req.query;
  const result = await reviewService.getMyReviews(req.user.id, Number(page), Number(limit));

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Your reviews fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const reviewController = {
  createReview,
  getMedicineReviews,
  updateReview,
  deleteReview,
  getMyReviews,
};