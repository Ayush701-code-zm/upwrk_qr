"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import CouponForm from "../components/CouponForm";

export default function AddCouponPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData = {
    code: "",
    type: "percentage",
    value: 0,
    minPurchase: undefined,
    maxDiscount: undefined,
    validFrom: new Date(),
    validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    usageLimit: undefined,
    isActive: true,
    appliesTo: "all",
    applicableIds: [],
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Here you would make an API call to create the coupon
      // const response = await fetch('/api/coupons', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });

      // if (!response.ok) throw new Error('Failed to create coupon');

      // Mock successful creation
      console.log("Coupon created:", data);

      // Redirect to coupons list
      router.push("/coupons");
    } catch (error) {
      console.error("Error creating coupon:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Add New Coupon
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Create a new discount coupon for your customers
          </p>
        </div>
        <Link href="/coupons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to List
          </motion.button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow overflow-hidden sm:rounded-lg p-6"
      >
        <CouponForm
          initialValues={initialFormData}
          onSubmit={handleSubmit}
          submitButtonText="Create Coupon"
          isSubmitting={isSubmitting}
          cancelHref="/coupons"
        />
      </motion.div>
    </div>
  );
}
