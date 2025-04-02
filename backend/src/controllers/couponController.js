// backend/src/controllers/couponController.js
import { supabase } from "../config/supabaseClient.js";

// Get all coupons
export const getAllCoupons = async (req, res) => {
  try {
    // Get pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    // Get filter parameters
    const { isActive, type, search } = req.query;

    // Start building the query
    let query = supabase.from("coupons").select("*");

    // Apply filters if provided
    if (isActive !== undefined) {
      query = query.eq("is_active", isActive === "true");
    }

    if (type) {
      query = query.eq("type", type);
    }

    if (search) {
      query = query.ilike("code", `%${search}%`);
    }

    // Get count for pagination
    const { count: totalCount, error: countError } = await query.count();

    if (countError) {
      return res.status(400).json({
        message: "Error counting coupons",
        error: countError.message,
      });
    }

    // Execute the query with pagination
    const { data: coupons, error } = await query
      .order("created_at", { ascending: false })
      .range(startIndex, startIndex + limit - 1);

    if (error) {
      return res.status(400).json({
        message: "Error retrieving coupons",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Coupons retrieved successfully",
      data: coupons,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Get all coupons error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single coupon by ID
export const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        message: "Coupon not found",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Coupon retrieved successfully",
      data: coupon,
    });
  } catch (error) {
    console.error("Get coupon by ID error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      type,
      value,
      minPurchase,
      maxDiscount,
      validFrom,
      validUntil,
      usageLimit,
      isActive,
      appliesTo,
      applicableIds,
    } = req.body;

    // Validate required fields
    if (
      !code ||
      !type ||
      value === undefined ||
      !validFrom ||
      !validUntil ||
      !appliesTo
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        requiredFields: [
          "code",
          "type",
          "value",
          "validFrom",
          "validUntil",
          "appliesTo",
        ],
      });
    }

    // Check if coupon code already exists
    const { data: existingCoupon, error: checkError } = await supabase
      .from("coupons")
      .select("id")
      .eq("code", code)
      .single();

    if (existingCoupon) {
      return res.status(400).json({
        message: "Coupon code already exists",
      });
    }

    // Insert new coupon
    const { data: newCoupon, error } = await supabase
      .from("coupons")
      .insert([
        {
          code,
          type,
          value,
          min_purchase: minPurchase || null,
          max_discount: maxDiscount || null,
          valid_from: new Date(validFrom).toISOString(),
          valid_until: new Date(validUntil).toISOString(),
          usage_limit: usageLimit || null,
          usage_count: 0,
          is_active: isActive !== undefined ? isActive : true,
          applies_to: appliesTo,
          applicable_ids: applicableIds || [],
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        message: "Error creating coupon",
        error: error.message,
      });
    }

    return res.status(201).json({
      message: "Coupon created successfully",
      data: newCoupon[0],
    });
  } catch (error) {
    console.error("Create coupon error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update a coupon
export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      type,
      value,
      minPurchase,
      maxDiscount,
      validFrom,
      validUntil,
      usageLimit,
      isActive,
      appliesTo,
      applicableIds,
    } = req.body;

    // Check if coupon exists
    const { data: existingCoupon, error: checkError } = await supabase
      .from("coupons")
      .select("id, code")
      .eq("id", id)
      .single();

    if (checkError) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }

    // If code is changing, check if new code already exists
    if (code && code !== existingCoupon.code) {
      const { data: codeExists, error: codeCheckError } = await supabase
        .from("coupons")
        .select("id")
        .eq("code", code)
        .neq("id", id)
        .single();

      if (codeExists) {
        return res.status(400).json({
          message: "Coupon code already exists",
        });
      }
    }

    // Prepare update data
    const updateData = {
      updated_at: new Date().toISOString(),
    };

    if (code) updateData.code = code;
    if (type) updateData.type = type;
    if (value !== undefined) updateData.value = value;
    if (minPurchase !== undefined)
      updateData.min_purchase = minPurchase === null ? null : minPurchase;
    if (maxDiscount !== undefined)
      updateData.max_discount = maxDiscount === null ? null : maxDiscount;
    if (validFrom) updateData.valid_from = new Date(validFrom).toISOString();
    if (validUntil) updateData.valid_until = new Date(validUntil).toISOString();
    if (usageLimit !== undefined)
      updateData.usage_limit = usageLimit === null ? null : usageLimit;
    if (isActive !== undefined) updateData.is_active = isActive;
    if (appliesTo) updateData.applies_to = appliesTo;
    if (applicableIds) updateData.applicable_ids = applicableIds;

    // Update coupon
    const { data: updatedCoupon, error } = await supabase
      .from("coupons")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        message: "Error updating coupon",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Coupon updated successfully",
      data: updatedCoupon[0],
    });
  } catch (error) {
    console.error("Update coupon error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if coupon exists
    const { data: existingCoupon, error: checkError } = await supabase
      .from("coupons")
      .select("id")
      .eq("id", id)
      .single();

    if (checkError) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }

    // Delete coupon
    const { error } = await supabase.from("coupons").delete().eq("id", id);

    if (error) {
      return res.status(400).json({
        message: "Error deleting coupon",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.error("Delete coupon error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Toggle coupon status (activate/deactivate)
export const toggleCouponStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (isActive === undefined) {
      return res.status(400).json({
        message: "isActive field is required",
      });
    }

    // Update coupon status
    const { data: updatedCoupon, error } = await supabase
      .from("coupons")
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        message: "Error updating coupon status",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: `Coupon ${isActive ? "activated" : "deactivated"} successfully`,
      data: updatedCoupon[0],
    });
  } catch (error) {
    console.error("Toggle coupon status error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Validate a coupon
export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const { cartTotal, productIds = [] } = req.body;

    // Find the coupon
    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code)
      .eq("is_active", true)
      .single();

    if (error) {
      return res.status(404).json({
        message: "Coupon not found or inactive",
        valid: false,
      });
    }

    // Check expiration
    const now = new Date();
    const validFrom = new Date(coupon.valid_from);
    const validUntil = new Date(coupon.valid_until);

    if (now < validFrom || now > validUntil) {
      return res.status(400).json({
        message: "Coupon is expired or not yet active",
        valid: false,
      });
    }

    // Check usage limit
    if (
      coupon.usage_limit !== null &&
      coupon.usage_count >= coupon.usage_limit
    ) {
      return res.status(400).json({
        message: "Coupon usage limit has been reached",
        valid: false,
      });
    }

    // Check minimum purchase
    if (coupon.min_purchase !== null && cartTotal < coupon.min_purchase) {
      return res.status(400).json({
        message: `Minimum purchase amount of ${coupon.min_purchase} not met`,
        valid: false,
        minimumAmount: coupon.min_purchase,
      });
    }

    // Check if applies to specific products or categories
    if (coupon.applies_to !== "all" && productIds.length > 0) {
      // This is a simplification - in a real app, you'd check if product IDs match the applicable_ids
      // or if products belong to applicable categories
      if (coupon.applicable_ids && coupon.applicable_ids.length > 0) {
        const hasMatch = productIds.some((id) =>
          coupon.applicable_ids.includes(id)
        );
        if (!hasMatch) {
          return res.status(400).json({
            message: "Coupon does not apply to the products in cart",
            valid: false,
          });
        }
      }
    }

    // Calculate discount amount
    let discountAmount = 0;

    if (coupon.type === "percentage") {
      discountAmount = (cartTotal * coupon.value) / 100;

      // Apply max discount if set
      if (
        coupon.max_discount !== null &&
        discountAmount > coupon.max_discount
      ) {
        discountAmount = coupon.max_discount;
      }
    } else if (coupon.type === "fixed") {
      discountAmount = Math.min(coupon.value, cartTotal);
    } else if (coupon.type === "shipping") {
      // For shipping, we'd need to know the shipping cost
      discountAmount = 0; // This would be the shipping cost in a real app
    }

    return res.status(200).json({
      message: "Coupon is valid",
      valid: true,
      discount: {
        type: coupon.type,
        value: coupon.value,
        amount: discountAmount,
      },
      coupon: {
        id: coupon.id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        minPurchase: coupon.min_purchase,
        maxDiscount: coupon.max_discount,
      },
    });
  } catch (error) {
    console.error("Validate coupon error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
