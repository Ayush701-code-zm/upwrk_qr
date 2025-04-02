import { supabase } from "../config/supabaseClient.js";
import Coupon from "../models/couponModel.js";

// Get all coupons
export const getAllCoupons = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res
        .status(400)
        .json({ message: "Error fetching coupons", error: error.message });
    }

    const coupons = data.map((coupon) => Coupon.fromSupabase(coupon));

    return res.status(200).json({
      coupons,
    });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get coupon by ID
export const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res
        .status(404)
        .json({ message: "Coupon not found", error: error.message });
    }

    const coupon = Coupon.fromSupabase(data);

    return res.status(200).json({
      coupon,
    });
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Create new coupon
export const createCoupon = async (req, res) => {
  try {
    const couponData = req.body;

    // Check if coupon code already exists
    const { data: existingCoupon } = await supabase
      .from("coupons")
      .select("id")
      .eq("code", couponData.code)
      .single();

    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    // Create new coupon instance
    const newCoupon = new Coupon(couponData);

    // Convert to Supabase format
    const supabaseCoupon = newCoupon.toSupabase();

    // Insert into database
    const { data, error } = await supabase
      .from("coupons")
      .insert([supabaseCoupon])
      .select();

    if (error) {
      return res
        .status(400)
        .json({ message: "Error creating coupon", error: error.message });
    }

    return res.status(201).json({
      message: "Coupon created successfully",
      coupon: Coupon.fromSupabase(data[0]),
    });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update coupon
export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const couponData = req.body;

    // Check if coupon exists
    const { data: existingCoupon, error: fetchError } = await supabase
      .from("coupons")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      return res
        .status(404)
        .json({ message: "Coupon not found", error: fetchError.message });
    }

    // Check if updated code already exists (if code is being changed)
    if (couponData.code && couponData.code !== existingCoupon.code) {
      const { data: codeExists } = await supabase
        .from("coupons")
        .select("id")
        .eq("code", couponData.code)
        .single();

      if (codeExists) {
        return res.status(400).json({ message: "Coupon code already exists" });
      }
    }

    // Create updated coupon with existing data as defaults
    const existingCouponObj = Coupon.fromSupabase(existingCoupon);
    const updatedCoupon = new Coupon({
      ...existingCouponObj,
      ...couponData,
      updatedAt: new Date(),
    });

    // Convert to Supabase format
    const supabaseCoupon = updatedCoupon.toSupabase();

    // Update in database
    const { data, error } = await supabase
      .from("coupons")
      .update(supabaseCoupon)
      .eq("id", id)
      .select();

    if (error) {
      return res
        .status(400)
        .json({ message: "Error updating coupon", error: error.message });
    }

    return res.status(200).json({
      message: "Coupon updated successfully",
      coupon: Coupon.fromSupabase(data[0]),
    });
  } catch (error) {
    console.error("Error updating coupon:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete coupon
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete from database
    const { error } = await supabase.from("coupons").delete().eq("id", id);

    if (error) {
      return res
        .status(400)
        .json({ message: "Error deleting coupon", error: error.message });
    }

    return res.status(200).json({
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
