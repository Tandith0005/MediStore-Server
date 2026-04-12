import { Request, Response } from "express";
import { medicineService } from "./medicine.service.js";
import { CreateMedicinePayload, UpdateMedicinePayload } from "../../types/index.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import status from "http-status";


// create your medicine
const createMedicine = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const data: CreateMedicinePayload = {
    ...req.body,
    sellerId: req.user.id,
  };

  const result = await medicineService.createMedicine(data);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Medicine created successfully",
    data: result,
  });
});

// get all medicines
const getMedicine = catchAsync(async (req: Request, res: Response) => {
  const result = await medicineService.getMedicine(req.query as any);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Medicines fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

// get specific medicine
const getMedicineById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await medicineService.getMedicineById(id as string);

  if (!result) {
    return sendResponse(res, {
      statusCode: status.NOT_FOUND,
      success: false,
      message: "Medicine not found",
    });
  }

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Medicine fetched successfully",
    data: result,
  });
});

// get your own medicines
const getMyMedicine = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const result = await medicineService.getMyMedicine(req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Your medicines fetched successfully",
    data: result,
  });
});

// update your medicine
const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const { id } = req.params;
  const data: UpdateMedicinePayload = {
    id,
    ...req.body,
  };

  const result = await medicineService.updateMedicine(data, req.user.id, req.user.role);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Medicine updated successfully",
    data: result,
  });
});

// delete your medicine
const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized - Please log in",
    });
  }

  const { id } = req.params;
  const result = await medicineService.deleteMedicine(id as string, req.user.id, req.user.role);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Medicine deleted successfully",
    data: result,
  });
});

export const medicineController = {
  getMedicine,
  getMedicineById,
  createMedicine,
  getMyMedicine,
  updateMedicine,
  deleteMedicine,
};