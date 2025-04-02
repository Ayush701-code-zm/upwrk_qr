// app/dashboard/coupons/[id]/edit/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Coupon Code
              </label>
              <div>
                <input
                  type="text"
                  name="code"
                  id="code"
                  required
                  value={formData.code}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                  placeholder="SUMMER25"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Coupon Type
              </label>
              <div>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="shipping">Free Shipping</option>
                  <option value="buyXgetY">Buy X Get Y</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="value"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {formData.type === "percentage"
                  ? "Discount Percentage"
                  : formData.type === "fixed"
                  ? "Discount Amount"
                  : formData.type === "shipping"
                  ? "Shipping Discount"
                  : "Get Y Free"}
              </label>
              <div>
                <input
                  type="number"
                  name="value"
                  id="value"
                  required
                  min={0}
                  value={formData.value}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="minPurchase"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Minimum Purchase
              </label>
              <div>
                <input
                  type="number"
                  name="minPurchase"
                  id="minPurchase"
                  min={0}
                  value={formData.minPurchase || ""}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="maxDiscount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Maximum Discount
              </label>
              <div>
                <input
                  type="number"
                  name="maxDiscount"
                  id="maxDiscount"
                  min={0}
                  value={formData.maxDiscount || ""}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="validFrom"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Valid From
              </label>
              <div>
                <input
                  type="date"
                  name="validFrom"
                  id="validFrom"
                  required
                  value={formData.validFrom.toISOString().split("T")[0]}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="validUntil"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Valid Until
              </label>
              <div>
                <input
                  type="date"
                  name="validUntil"
                  id="validUntil"
                  required
                  value={formData.validUntil.toISOString().split("T")[0]}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="usageLimit"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Usage Limit
              </label>
              <div>
                <input
                  type="number"
                  name="usageLimit"
                  id="usageLimit"
                  min={0}
                  value={formData.usageLimit || ""}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="appliesTo"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Applies To
              </label>
              <div>
                <select
                  id="appliesTo"
                  name="appliesTo"
                  required
                  value={formData.appliesTo}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                >
                  <option value="all">All Products</option>
                  <option value="categories">Specific Categories</option>
                  <option value="products">Specific Products</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isActive"
                  className="ml-3 block text-base font-medium text-gray-900"
                >
                  Active
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Link href={`/dashboard/coupons/${id}`}>
              <button
                type="button"
                className="py-3 px-6 border-2 border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </Link>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Update Coupon"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
