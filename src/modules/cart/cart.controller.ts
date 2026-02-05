import React from "react";
import { Request, Response } from "express";
import { cartService } from "./cart.service.js";

// get cart
const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // business logic here
    const result = await cartService.getCart(userId as string);
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};
//  UserCart
const upsertUserCart = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params; // medicine id here
    const userId = req.user!.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // business logic here
    const result = await cartService.upsertUserCart(
      medicineId as string,
      userId as string,
    );
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};
const minusUserCart = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params; // medicine id here
    const userId = req.user!.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // business logic here
    const result = await cartService.minusUserCart(
      medicineId as string,
      userId as string,
    );
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};

const deleteItemsInCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // cart item id here
    const userId = req.user!.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // business logic here
    const result = await cartService.deleteItemsInCart(
      id as string,
      userId as string,
    );
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: " Operation failed",
      details: e,
    });
  }
};

export const cartController = {
  getCart,
  upsertUserCart,
  minusUserCart,
  deleteItemsInCart,
};
