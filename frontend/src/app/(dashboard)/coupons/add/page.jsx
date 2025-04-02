"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

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

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
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
    setIsSubmitting(true);

    try {
      // Here you would make an API call to create the coupon
      // const response = await fetch('/api/coupons', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) throw new Error('Failed to create coupon');

      // Mock successful creation
      console.log("Coupon created:", formData);

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
              {isSubmitting ? "Processing..." : "Create Coupon"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
