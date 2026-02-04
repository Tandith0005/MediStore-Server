import { categoryService } from "./category.service";
import { Request, Response } from "express";

const getCategories = async (_req: Request, res: Response) => {
  const categories = await categoryService.getCategories();
  res.json(categories);
};

const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name required" });
  }

  const category = await categoryService.createCategory(name);
  res.status(201).json(category);
};


export const categoryController = { getCategories, createCategory };