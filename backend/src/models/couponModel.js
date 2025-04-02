export default class Coupon {
  constructor({
    id = null,
    code,
    type,
    value,
    minPurchase = null,
    maxDiscount = null,
    validFrom,
    validUntil,
    usageLimit = null,
    usageCount = 0,
    isActive = true,
    appliesTo = "all",
    applicableIds = [],
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id;
    this.code = code;
    this.type = type;
    this.value = value;
    this.minPurchase = minPurchase;
    this.maxDiscount = maxDiscount;
    this.validFrom = validFrom;
    this.validUntil = validUntil;
    this.usageLimit = usageLimit;
    this.usageCount = usageCount;
    this.isActive = isActive;
    this.appliesTo = appliesTo;
    this.applicableIds = applicableIds;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  static fromSupabase(supabaseCoupon) {
    return new Coupon({
      id: supabaseCoupon.id,
      code: supabaseCoupon.code,
      type: supabaseCoupon.type,
      value: supabaseCoupon.value,
      minPurchase: supabaseCoupon.min_purchase,
      maxDiscount: supabaseCoupon.max_discount,
      validFrom: new Date(supabaseCoupon.valid_from),
      validUntil: new Date(supabaseCoupon.valid_until),
      usageLimit: supabaseCoupon.usage_limit,
      usageCount: supabaseCoupon.usage_count || 0,
      isActive: supabaseCoupon.is_active,
      appliesTo: supabaseCoupon.applies_to,
      applicableIds: supabaseCoupon.applicable_ids || [],
      createdAt: new Date(supabaseCoupon.created_at),
      updatedAt: new Date(supabaseCoupon.updated_at),
    });
  }

  toSupabase() {
    return {
      code: this.code,
      type: this.type,
      value: this.value,
      min_purchase: this.minPurchase,
      max_discount: this.maxDiscount,
      valid_from: this.validFrom,
      valid_until: this.validUntil,
      usage_limit: this.usageLimit,
      usage_count: this.usageCount,
      is_active: this.isActive,
      applies_to: this.appliesTo,
      applicable_ids: this.applicableIds,
    };
  }
}
