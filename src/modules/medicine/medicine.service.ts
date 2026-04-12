import { OrderStatus } from "../../generated/client/index.js";
import { prisma } from "../../lib/prisma.js";
import { CreateMedicinePayload, FilterQuery, UpdateMedicinePayload } from "../../types/index.js";
import AppError from "../../utils/AppError.js";

// create your medicine
const createMedicine = async (payload: CreateMedicinePayload) => {
  const addMedicine = await prisma.medicines.create({
    data: {
      name: payload.name,
      description: payload.description || "",
      manufacturer: payload.manufacturer,
      price: payload.price,
      image: payload.image || "",
      categoryId: payload.categoryId, 
      sellerId: payload.sellerId,
    },
    include: {
      category: { select: { id: true, name: true } },
      seller: { select: { id: true, name: true, email: true } },
    },
  });
  return addMedicine;
};

// get all medicines
const getMedicine = async (query: FilterQuery) => {
  const {
    search,
    category,
    manufacturer,
    minPrice,
    maxPrice,
    page = "1",
    limit = "12",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const pageNumber = Math.max(1, Number(page));
  const limitNumber = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNumber - 1) * limitNumber;

  const whereCondition: any = {};

  if (search) {
    whereCondition.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // Filter by category name
  if (category && category !== "All") {
    whereCondition.category = {
      name: { equals: category, mode: "insensitive" }
    };
  }

  // Filter by manufacturer
  if (manufacturer && manufacturer !== "All") {
    whereCondition.manufacturer = {
      equals: manufacturer,
      mode: "insensitive"
    };
  }

  if (minPrice || maxPrice) {
    whereCondition.price = {
      ...(minPrice ? { gte: Number(minPrice) } : {}),
      ...(maxPrice ? { lte: Number(maxPrice) } : {}),
    };
  }

  const orderBy: any = {};
  orderBy[sortBy] = sortOrder;

  const [data, total] = await Promise.all([
    prisma.medicines.findMany({
      where: whereCondition,
      orderBy: orderBy,
      skip,
      take: limitNumber,
      include: {
        category: { select: { id: true, name: true } },
        seller: { select: { id: true, name: true } },
      },
    }),
    prisma.medicines.count({
      where: whereCondition,
    }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
      hasNext: pageNumber < Math.ceil(total / limitNumber),
      hasPrev: pageNumber > 1,
    },
    data,
  };
};

// get specific medicine
const getMedicineById = async (id: string) => {
  const medicine = await prisma.medicines.findUnique({
    where: { id },
    include: {
      category: true,
      seller: {
        select: { id: true, name: true, email: true },
      },
      reviews: {
        include: { user: { select: { id: true, name: true } } },
      },
    },
  });

  if (!medicine) return null;

  // Calculate average rating and stats
  const ratings = medicine.reviews.map(r => r.rating);
  const averageRating = ratings.length > 0 
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
    : 0;

  return {
    ...medicine,
    averageRating: Number(averageRating.toFixed(1)),
    totalReviews: ratings.length,
    ratingDistribution: {
      5: ratings.filter(r => r === 5).length,
      4: ratings.filter(r => r === 4).length,
      3: ratings.filter(r => r === 3).length,
      2: ratings.filter(r => r === 2).length,
      1: ratings.filter(r => r === 1).length,
    },
  };
};

// get your own medicines
const getMyMedicine = async (userId: string) => {
  return prisma.medicines.findMany({
    where: { sellerId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
    },
  });
};

// update your medicine (using UpdateMedicinePayload)
const updateMedicine = async (
  payload: UpdateMedicinePayload,
  userId: string,
  userRole: string,
) => {
  if (!payload.id) throw new AppError( 400 ,"Medicine ID is required for update");

  const existingMedicine = await prisma.medicines.findUnique({
    where: { id: payload.id },
  });

  if (!existingMedicine) throw new AppError( 404 ,"Medicine not found");

  // Only seller who owns the medicine or admin can update
  if (userRole !== "ADMIN" && existingMedicine.sellerId !== userId) {
    throw new AppError( 403 ,"You are not authorized to update this medicine");
  }

  // only include fields that are provided
  const updateData: any = {};
  
  if (payload.name !== undefined) updateData.name = payload.name;
  if (payload.description !== undefined) updateData.description = payload.description;
  if (payload.manufacturer !== undefined) updateData.manufacturer = payload.manufacturer;
  if (payload.price !== undefined) updateData.price = payload.price;
  if (payload.image !== undefined) updateData.image = payload.image;
  if (payload.categoryId !== undefined) updateData.categoryId = payload.categoryId;

  // If no fields to update, throw error
  if (Object.keys(updateData).length === 0) {
    throw new AppError( 400 ,"No fields provided for update");
  }

  const medicine = await prisma.medicines.update({
    where: { id: payload.id },
    data: updateData,
    include: {
      category: { select: { id: true, name: true } },
      seller: { select: { id: true, name: true, email: true } },
    },
  });
  
  return medicine;
};

// delete your medicine
const deleteMedicine = async (id: string, userId: string, role: string) => {
  const medicine = await prisma.medicines.findUnique({ 
    where: { id }
  });

  if (!medicine) {
    throw new AppError(404, "Medicine not found");
  }

  // Check authorization
  if (role !== "ADMIN" && medicine.sellerId !== userId) {
    throw new AppError( 403 ,"You are not authorized to delete this medicine");
  }


  return prisma.medicines.delete({
    where: { id },
  });
};

export const medicineService = {
  getMedicine,
  getMedicineById,
  createMedicine,
  getMyMedicine,
  updateMedicine,
  deleteMedicine,
};