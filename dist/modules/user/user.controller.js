"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
// get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await user_service_1.userService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error: " Operation failed",
            details: error
        });
    }
};
// ban user (admin only)
const banUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const status = req.body.status;
        const user = await user_service_1.userService.banUser(userId, status);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error: " Operation failed",
            details: error
        });
    }
};
const updateMe = async (req, res) => {
    const userId = req.user.id;
    const payload = req.body;
    const updatedUser = await user_service_1.userService.updateUser(userId, payload);
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
    });
};
const deleteMe = async (req, res) => {
    const userId = req.user.id;
    await user_service_1.userService.deleteUser(userId);
    res.status(200).json({
        success: true,
        message: "User account deleted",
    });
};
exports.userController = {
    getAllUsers,
    banUser,
    updateMe,
    deleteMe,
};
//# sourceMappingURL=user.controller.js.map