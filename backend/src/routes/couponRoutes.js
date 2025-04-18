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

export default router;
