// app/dashboard/coupons/[id]/edit/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { toast } from "react-hot-toast";

export default function EditCouponPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/api/coupons/${id}`);

        // Transform API response to match form fields
        const couponData = response.data.data;
        const formattedData = {
          code: couponData.code,
          type: couponData.type,
          value: couponData.value,
          minPurchase: couponData.min_purchase,
          maxDiscount: couponData.max_discount,
          validFrom: new Date(couponData.valid_from),
          validUntil: new Date(couponData.valid_until),
          usageLimit: couponData.usage_limit,
          usageCount: couponData.usage_count,
          isActive: couponData.is_active,
          appliesTo: couponData.applies_to,
          applicableIds: couponData.applicable_ids || [],
        };

        setFormData(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching coupon:", err);
        setError(
          "Failed to fetch coupon. It may not exist or has been deleted."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupon();
  }, [id]);

  // Convert date string in MM/DD/YYYY format to a Date object
  const parseAmericanDate = (dateString) => {
    if (!dateString) return new Date();
    const [month, day, year] = dateString.split("/");
    return new Date(year, month - 1, day);
  };

  // Format date to MM/DD/YYYY string
  const formatDateToAmerican = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

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
    } else if (name === "validFrom" || name === "validUntil") {
      // Handle date inputs in MM/DD/YYYY format
      setFormData((prev) => ({
        ...prev,
        [name]: parseAmericanDate(value),
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
    setError(null);

    try {
      // Transform form data to match API expectations
      const apiData = {
        code: formData.code,
        type: formData.type,
        value: formData.value,
        minPurchase: formData.minPurchase,
        maxDiscount: formData.maxDiscount,
        validFrom: formData.validFrom.toISOString(),
        validUntil: formData.validUntil.toISOString(),
        usageLimit: formData.usageLimit,
        isActive: formData.isActive,
        appliesTo: formData.appliesTo,
        applicableIds: formData.applicableIds,
      };

      // Send update request to API
      const response = await apiClient.put(`/api/coupons/${id}`, apiData);

      toast.success("Coupon updated successfully!");

      // Redirect to coupon details or list page
      router.push(`/coupons`);
    } catch (err) {
      console.error("Error updating coupon:", err);

      // Extract error message from API response if available
      const errorMessage =
        err.response?.data?.message ||
        "Failed to update coupon. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
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

  if (error && !formData) {
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
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <Link href="/coupons">
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
            <span className="font-medium">{formData?.code}</span>
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
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

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
                  value={formData?.code || ""}
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
                <input
                  type="text"
                  id="type"
                  value="Percentage Discount"
                  readOnly
                  className="shadow-sm bg-gray-50 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                />
                <input type="hidden" name="type" value="percentage" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="value"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Discount Percentage
              </label>
              <div>
                <input
                  type="number"
                  name="value"
                  id="value"
                  required
                  min={0}
                  max={100}
                  value={formData?.value || 0}
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
                  value={formData?.minPurchase || ""}
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
                  value={formData?.maxDiscount || ""}
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
                  type="text"
                  name="validFrom"
                  id="validFrom"
                  required
                  value={
                    formData?.validFrom
                      ? formatDateToAmerican(formData.validFrom)
                      : ""
                  }
                  onChange={handleChange}
                  placeholder="MM/DD/YYYY"
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
                  type="text"
                  name="validUntil"
                  id="validUntil"
                  required
                  value={
                    formData?.validUntil
                      ? formatDateToAmerican(formData.validUntil)
                      : ""
                  }
                  onChange={handleChange}
                  placeholder="MM/DD/YYYY"
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
                  value={formData?.usageLimit || ""}
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
                  value={formData?.appliesTo || "all"}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3"
                >
                  <option value="all">All Products</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData?.isActive || false}
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
            <Link href="/coupons">
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
