import { Request, Response } from "express";
import React from "react";
import { medicineService } from "./medicine.service";
import { CreateMedicinePayload } from "../../types";

// create your medicine
const createMedicine = async (req: Request, res: Response) => {
  try {
    const data = req.body as CreateMedicinePayload;

    // business logic here
    const result = await medicineService.createMedicine(data);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};

// get all medicines
const getMedicine = async (req: Request, res: Response) => {
  try {
    // business logic here
    const result = await medicineService.getMedicine();
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
    const result = await medicineService.updateMedicine(data, req.user.id, req.user.role);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};

export const medicineController = {
  getMedicine,
  createMedicine,
  updateMedicine,
};
