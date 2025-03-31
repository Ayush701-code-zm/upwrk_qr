// app/dashboard/coupons/[id]/edit/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import CouponForm from "../../components/CouponForm";

// Mock data - replace with API call in the future
const mockCoupon = {
  id: "1",
  code: "SUMMER25",
  type: "percentage",
  value: 25,
  minPurchase: 100,
  maxDiscount: 50,
  validFrom: new Date("2025-05-01"),
  validUntil: new Date("2025-08-31"),
  usageLimit: 1000,
  usageCount: 243,
  isActive: true,
  appliesTo: "all",
  createdAt: new Date("2025-04-15"),
  updatedAt: new Date("2025-04-15"),
};

export default function EditCouponPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // In a real app, fetch from API
    // const fetchCoupon = async () => {
    //   try {
    //     const response = await fetch(`/api/coupons/${id}`);
    //     if (!response.ok) throw new Error('Failed to fetch coupon');
    //     const data = await response.json();
    //
    //     // Convert date strings to Date objects
    //     const formattedData = {
    //       ...data,
    //       validFrom: new Date(data.validFrom),
    //       validUntil: new Date(data.validUntil),
    //     };
    //
    //     setFormData(formattedData);
    //   } catch (error) {
    //     console.error('Error fetching coupon:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // fetchCoupon();

    // For demo purposes, use mock data
    setTimeout(() => {
      const couponData = { ...mockCoupon, id };
      const {
        id: couponId,
        usageCount,
        createdAt,
        updatedAt,
        ...formValues
      } = couponData;
      setFormData(formValues);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    if (!formData) return;

    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? undefined : Number(value),
      }));
    } else if (type === "date") {
      setFormData((prev) => ({
        ...prev,
        [name]: new Date(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (data) => {
    if (!formData) return;

    setIsSubmitting(true);

    try {
      // Here you would make an API call to update the coupon
      // const response = await fetch(`/api/coupons/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) throw new Error('Failed to update coupon');

      // Mock successful update
      console.log("Coupon updated:", formData);

      // Redirect to coupon details
      router.push(`/dashboard/coupons/${id}`);
    } catch (error) {
      console.error("Error updating coupon:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse text-gray-500">
            Loading coupon data...
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Coupon not found
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  The coupon you are trying to edit does not exist or has been
                  deleted.
                </p>
              </div>
              <div className="mt-4">
                <Link href="/dashboard/coupons">
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Back to Coupons
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Edit Coupon</h1>
          <p className="mt-2 text-sm text-gray-700">
            Update details for coupon code:{" "}
            <span className="font-medium">{formData.code}</span>
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link href={`/dashboard/coupons/${id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </motion.button>
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow overflow-hidden sm:rounded-lg p-6"
      >
        <CouponForm
          initialValues={formData}
          onSubmit={handleSubmit}
          submitButtonText="Create Coupon"
          isSubmitting={isSubmitting}
          cancelHref="/coupons"
        />
      </motion.div>
    </div>
  );
}
