import { categoryService } from "./category.service.js";
const getCategories = async (_req, res) => {
    const categories = await categoryService.getCategories();
    res.json(categories);
};
const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name required" });
    }
    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
};
export const categoryController = { getCategories, createCategory };
//# sourceMappingURL=category.controller.js.map