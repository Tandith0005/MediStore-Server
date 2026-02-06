import { Request, Response } from "express";
import { userService } from "./user.service.js";



// get all users (admin only)
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: " Operation failed",
      details: error
    })
  }
}

// ban user (admin only)
const banUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const status = req.body.status;
    const user = await userService.banUser(userId as string, status);
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: " Operation failed",
      details: error
    })
  }
}
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
  getAllUsers,
  banUser,
  updateMe,
  deleteMe,
};
