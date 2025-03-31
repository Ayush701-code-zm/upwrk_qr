// backend/src/routes/protectedRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(authMiddleware);

// Example protected routes
router.get("/user-profile", (req, res) => {
  // The user object is attached by the authMiddleware
  res.status(200).json({
    message: "Protected data retrieved successfully",
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    },
  });
});

router.get("/dashboard-data", (req, res) => {
  // Example dashboard data endpoint
  res.status(200).json({
    message: "Dashboard data retrieved successfully",
    data: {
      stats: {
        customers: 120,
        sellers: 45,
        affiliates: 32,
      },
      // Add more dashboard data as needed
    },
  });
});

router.get("/admin-data", (req, res) => {
  // Example admin-only data endpoint
  // Here you could add additional role-based checks
  res.status(200).json({
    message: "Admin data retrieved successfully",
    data: {
      // Admin data
    },
  });
});

export default router;
