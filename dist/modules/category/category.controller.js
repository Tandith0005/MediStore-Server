"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_service_1 = require("./category.service");
const getCategories = async (_req, res) => {
    const categories = await category_service_1.categoryService.getCategories();
    res.json(categories);
};
const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name required" });
    }
    const category = await category_service_1.categoryService.createCategory(name);
    res.status(201).json(category);
};
exports.categoryController = { getCategories, createCategory };
//# sourceMappingURL=category.controller.js.map