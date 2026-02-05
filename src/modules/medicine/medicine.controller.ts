import { Request, Response } from "express";
import React from "react";
import { medicineService } from "./medicine.service";
import { CreateMedicinePayload } from "../../types";

// create your medicine
const createMedicine = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = {
      ...req.body,
      sellerId: req.user.id,
    };
    // business logic here
    const result = await medicineService.createMedicine(data);
    res.status(201).json(result);
  } catch (e) {
    console.error("CREATE MEDICINE ERROR:", e);
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};

// get all medicines
const getMedicine = async (req: Request, res: Response) => {
  try {
    const { search, category, manufacturer, minPrice, maxPrice } = req.query;

    const result = await medicineService.getMedicine({
      search: search as string,
      category: category as string,
      manufacturer: manufacturer as string,
      minPrice: minPrice as string,
      maxPrice: maxPrice as string,
    });

    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: "Operation failed",
      details: e,
    });
  }
};

// get specific medicine
const getMedicineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // business logic here
    const result = await medicineService.getMedicineById(id as string);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};

// get your own medicines
const getMyMedicine = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // business logic here
    const result = await medicineService.getMyMedicine(req.user.id);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};

// update your medicine
const updateMedicine = async (req: Request, res: Response) => {
  try {
    const data = req.body as CreateMedicinePayload;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // business logic here
    const result = await medicineService.updateMedicine(
      data,
      req.user.id,
      req.user.role,
    );
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};

// delete your medicine
const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // business logic here
    const result = await medicineService.deleteMedicine(
      id as string,
      req.user.id,
      req.user.role,
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};

// main shop filters ----------------------------------
// const getMedicines = async (req: Request, res: Response) => {
//   try {
//     const medicines = await medicineService.getMedicines(req.query);
//     res.json(medicines);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch medicines" });
//   }
// };

export const medicineController = {
  getMedicine,
  getMedicineById,
  createMedicine,
  getMyMedicine,
  updateMedicine,
  deleteMedicine,
  // getMedicines
};
