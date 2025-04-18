import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import protectedRoutes from "./src/routes/protectedRoutes.js";
import couponRoutes from "./src/routes/couponRoutes.js";
// Import validateCoupon directly
import { validateCoupon } from "./src/controllers/couponController.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Basic route
app.get("/api", (req, res) => {
  res.json({ message: "Backend is running successfully" });
});

// PUBLIC COUPON VALIDATION ENDPOINT - No auth required
app.post("/api/validate-coupon/:code", validateCoupon);

// Use authRoutes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/protected", protectedRoutes);

// Protected coupon routes
app.use("/api/coupons", couponRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Server error",
    error: process.env.NODE_ENV !== "production" ? err.message : {},
  });
});

// Running server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `Public coupon validation available at: http://localhost:${PORT}/api/validate-coupon/:code`
  );
});
