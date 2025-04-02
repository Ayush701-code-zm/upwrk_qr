// backend/src/routes/couponRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
  validateCoupon,
} from "../controllers/couponController.js";

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authMiddleware);

// Admin routes - protected by authentication
router.get("/", getAllCoupons);
router.get("/:id", getCouponById);
router.post("/", createCoupon);
router.put("/:id", updateCoupon);
router.delete("/:id", deleteCoupon);
router.patch("/:id/toggle", toggleCouponStatus);

// Public route - for validating coupons during checkout
// Note: This would typically be behind auth as well, but here we're exposing it
// for testing purposes
router.post("/validate/:code", validateCoupon);

export default router;
