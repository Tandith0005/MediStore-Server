import { Request, Response } from "express";
import { userService } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import status from "http-status";

// get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

// ban user
const banUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await userService.banUser(userId as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User status updated",
    data: user,
  });
});
// unban user
const unbanUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await userService.unbanUser(userId as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User status updated",
    data: user,
  });
});

// get me
const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const user = await userService.getUser(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Profile fetched successfully",
    data: user,
  });
});

// update me
const updateMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const updatedUser = await userService.updateUser(userId, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

// delete me
const deleteMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  await userService.deleteUser(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User account deleted",
  });
});

export const userController = {
  getAllUsers,
  banUser,
  unbanUser,
  getMe,
  updateMe,
  deleteMe,
};