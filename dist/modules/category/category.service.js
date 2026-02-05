"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const getCategories = async () => {
    return prisma_1.prisma.category.findMany({ orderBy: { createdAt: "desc" } });
};
const createCategory = async (name) => {
    return prisma_1.prisma.category.create({ data: { name } });
};
exports.categoryService = {
    getCategories,
    createCategory,
};
//# sourceMappingURL=category.service.js.map