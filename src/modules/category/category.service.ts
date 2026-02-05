import { prisma } from "../../lib/prisma.js";

const getCategories = async () => {
  return prisma.category.findMany({ orderBy: { createdAt: "desc" } });
};

const createCategory = async (name: string) => {
  return prisma.category.create({ data: { name } });
};

export const categoryService = {
  getCategories,
  createCategory,
};
