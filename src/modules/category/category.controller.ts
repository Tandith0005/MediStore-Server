// src/modules/category/category.controller.ts
import { categoryService } from "./category.service.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import status from "http-status";

const getCategories = async (_req: Request, res: Response) => {
  const categories = await categoryService.getCategories();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  });
};

const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Category name is required",
    });
  }

  const category = await categoryService.createCategory(name);
  
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Category created successfully",
    data: category,
  });
};

export const categoryController = { getCategories, createCategory };