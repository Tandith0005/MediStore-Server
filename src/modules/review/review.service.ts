// modules/reviews/review.service.ts
import { prisma } from "../../lib/prisma.js";
import { CreateReviewPayload, UpdateReviewPayload } from "../../types/index.js";
import AppError from "../../utils/AppError.js";

// Create a review (only customers can review)
const createReview = async (payload: CreateReviewPayload, userId: string) => {
  // Check if user has purchased this medicine (optional - recommended)
  const hasPurchased = await prisma.orderItem.findFirst({
    where: {
      medicineId: payload.medicineId,
      order: {
        customerId: userId,
        status: "COMPLETED",
      },
    },
  });

  // Check if user has purchased this medicine
  if (!hasPurchased) {
    throw new AppError(403, "You can only review medicines you've purchased");
  }

  // Check if user already reviewed this medicine
  const existingReview = await prisma.reviews.findFirst({
    where: {
      medicineId: payload.medicineId,
      userId: userId,
    },
  });

  if (existingReview) {
    throw new AppError(400, "You have already reviewed this medicine");
  }

  // Validate rating
  if (payload.rating < 1 || payload.rating > 5) {
    throw new AppError(400, "Rating must be between 1 and 5");
  }

  const review = await prisma.reviews.create({
    data: {
      medicineId: payload.medicineId,
      userId: userId,
      rating: payload.rating,
      comment: payload.comment || "",
    },
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
      medicine: {
        select: { id: true, name: true },
      },
    },
  });

  return review;
};

// Get all reviews for a medicine (with pagination)
const getMedicineReviews = async (medicineId: string, page: number = 1, limit: number = 10) => {
  const pageNumber = Math.max(1, page);
  const limitNumber = Math.min(50, Math.max(1, limit));
  const skip = (pageNumber - 1) * limitNumber;

  const [reviews, total] = await Promise.all([
    prisma.reviews.findMany({
      where: { medicineId },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNumber,
    }),
    prisma.reviews.count({ where: { medicineId } }),
  ]);

  // Calculate average rating
  const ratings = await prisma.reviews.aggregate({
    where: { medicineId },
    _avg: { rating: true },
    _count: true,
  });

  return {
    data: reviews,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
      averageRating: ratings._avg.rating || 0,
      totalReviews: ratings._count,
    },
  };
};

// Update user's own review
const updateReview = async (payload: UpdateReviewPayload, userId: string) => {
  const existingReview = await prisma.reviews.findUnique({
    where: { id: payload.id },
  });

  if (!existingReview) {
    throw new AppError(404, "Review not found");
  }

  if (existingReview.userId !== userId) {
    throw new AppError(403, "You can only update your own reviews");
  }

  const updateData: any = {};
  if (payload.rating !== undefined) {
    if (payload.rating < 1 || payload.rating > 5) {
      throw new AppError(400, "Rating must be between 1 and 5");
    }
    updateData.rating = payload.rating;
  }
  if (payload.comment !== undefined) updateData.comment = payload.comment;

  if (Object.keys(updateData).length === 0) {
    throw new AppError(400, "No fields provided for update");
  }

  const review = await prisma.reviews.update({
    where: { id: payload.id },
    data: updateData,
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  return review;
};

// Delete user's own review
const deleteReview = async (id: string, userId: string, userRole: string) => {
  const review = await prisma.reviews.findUnique({
    where: { id },
  });

  if (!review) {
    throw new AppError(404, "Review not found");
  }

  // Admin can delete any review, users can only delete their own
  if (userRole !== "ADMIN" && review.userId !== userId) {
    throw new AppError(403, "You can only delete your own reviews");
  }

  return prisma.reviews.delete({
    where: { id },
  });
};

// Get user's all reviews
const getMyReviews = async (userId: string, page: number = 1, limit: number = 10) => {
  const pageNumber = Math.max(1, page);
  const limitNumber = Math.min(50, Math.max(1, limit));
  const skip = (pageNumber - 1) * limitNumber;

  const [reviews, total] = await Promise.all([
    prisma.reviews.findMany({
      where: { userId },
      include: {
        medicine: {
          select: { id: true, name: true, image: true, price: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNumber,
    }),
    prisma.reviews.count({ where: { userId } }),
  ]);

  return {
    data: reviews,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
    },
  };
};

export const reviewService = {
  createReview,
  getMedicineReviews,
  updateReview,
  deleteReview,
  getMyReviews,
};