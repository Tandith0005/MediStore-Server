import React from "react";
import { prisma } from "../../lib/prisma";
import { CreateMedicinePayload } from "../../types";
import { UserRole } from "../../middleware/verifyRole";

// create your medicine
const createMedicine = async (payload: CreateMedicinePayload) => {
  const addMedicine = await prisma.medicines.create({
    data: {
      name: payload.name,
      description: payload.description,
      manufacturer: payload.manufacturer,
      price: payload.price,
      image: payload.image,
      category: payload.category,
      sellerId: payload.sellerId,
    },
  });
  return addMedicine;
};

// get all medicines
const getMedicine = async () => {
  const medicine = await prisma.medicines.findMany();
  return medicine;
};

// get your own medicines
const getMyMedicine = async (userId: string) => {
  const medicine = await prisma.medicines.findMany({
    where: { sellerId: userId },
  });
  return medicine;
};

// update your medicine
const updateMedicine = async (payload: CreateMedicinePayload, userId: string, userRole: string) => {
  if (!payload.id) throw new Error("Medicine ID is required for update");

  const existingMedicine = await prisma.medicines.findUnique({
    where: { id: payload.id },
  });

  if (!existingMedicine) throw new Error("Medicine not found");

  // Only seller who owns the medicine or admin to update
  if (userRole !== "ADMIN" && existingMedicine.sellerId !== userId) {
    throw new Error("You are not authorized to update this medicine");
  }

  const medicine = await prisma.medicines.update({
    where: { id: payload.id },
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      category: payload.category,
    },
  });
  return medicine;
};

// delete your medicine
const deleteMedicine = async (medicineId: string) => {
  const medicine = await prisma.medicines.delete({
    where: { id: medicineId },
  });
  return medicine;
};

export const medicineService = {
  getMedicine,
  createMedicine,
  getMyMedicine,
  updateMedicine,
  deleteMedicine
};
