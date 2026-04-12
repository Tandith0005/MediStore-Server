// modules/reviews/review.router.ts
import { Router } from "express";
import { reviewController } from "./review.controller.js";
import { authenticate } from "../../middleware/authenticate_requireRole.js";

const router = Router();


// Get reviews for a specific medicine
router.get("/medicine/:medicineId", reviewController.getMedicineReviews);

// All review routes require authentication
router.use(authenticate);
// Create a review
router.post("/", reviewController.createReview);
// Get user's all reviews
router.get("/my-reviews", reviewController.getMyReviews);
// Update a review
router.patch("/:id", reviewController.updateReview);
// Delete a review
router.delete("/:id", reviewController.deleteReview);


export const reviewRouter = router;