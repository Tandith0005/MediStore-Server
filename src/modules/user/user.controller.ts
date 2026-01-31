import { Request, Response } from "express";
import { userService } from "./user.service";




const updateMe = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const payload = req.body;

  const updatedUser = await userService.updateUser(userId, payload);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
};

const deleteMe = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  await userService.deleteUser(userId);

  res.status(200).json({
    success: true,
    message: "User account deleted",
  });
};

export const userController = {
  updateMe,
  deleteMe,
};
