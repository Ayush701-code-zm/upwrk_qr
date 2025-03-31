// app/dashboard/coupons/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import DeleteModal from "../components/DeleteModal";

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

export default function CouponDetailsPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [coupon, setCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // In a real app, fetch from API
    // const fetchCoupon = async () => {
    //   try {
    //     const response = await fetch(`/api/coupons/${id}`);
    //     if (!response.ok) throw new Error('Failed to fetch coupon');
    //     const data = await response.json();
    //     setCoupon(data);
    //   } catch (error) {
    //     console.error('Error fetching coupon:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // fetchCoupon();

    // For demo purposes, use mock data
    setTimeout(() => {
      setCoupon({ ...mockCoupon, id });
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleDelete = async () => {
    try {
      // In a real app, make API call to delete
      // const response = await fetch(`/api/coupons/${id}`, {
      //   method: 'DELETE'
      // });
      // if (!response.ok) throw new Error('Failed to delete coupon');

      // Mock successful deletion
      console.log("Coupon deleted:", id);

      // Redirect to coupons list
      router.push("/dashboard/coupons");
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse text-gray-500">
            Loading coupon details...
          </div>
        </div>
      </div>
    );
  }

  if (!coupon) {
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
                  The coupon you are looking for does not exist or has been
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
          <h1 className="text-2xl font-semibold text-gray-900">
            Coupon Details
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            View details for coupon code:{" "}
            <span className="font-medium">{coupon.code}</span>
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link href="/dashboard/coupons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to List
            </motion.button>
          </Link>
          <Link href={`/dashboard/coupons/${id}/edit`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Coupon
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow overflow-hidden sm:rounded-lg"
      >
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {coupon.code}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {coupon.isActive ? (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            ) : (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                Inactive
              </span>
            )}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Coupon Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {coupon.type.charAt(0).toUpperCase() + coupon.type.slice(1)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Discount Value
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {coupon.type === "percentage"
                  ? `${coupon.value}%`
                  : coupon.type === "fixed"
                  ? `$${coupon.value}`
                  : coupon.type === "shipping"
                  ? "Free Shipping"
                  : `Buy X Get ${coupon.value}`}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Minimum Purchase
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {coupon.minPurchase ? `$${coupon.minPurchase}` : "No minimum"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Maximum Discount
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {coupon.maxDiscount ? `$${coupon.maxDiscount}` : "No maximum"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Valid Period
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDate(coupon.validFrom)} to{" "}
                {formatDate(coupon.validUntil)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Usage</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {coupon.usageCount} used
                {coupon.usageLimit
                  ? ` (Limit: ${coupon.usageLimit})`
                  : " (No limit)"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Applies To</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {coupon.appliesTo === "all"
                  ? "All Products"
                  : coupon.appliesTo === "categories"
                  ? "Specific Categories"
                  : "Specific Products"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDate(coupon.createdAt)}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Last Updated
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDate(coupon.updatedAt)}
              </dd>
            </div>
          </dl>
        </div>
      </motion.div>

      {showDeleteModal && (
        <DeleteModal
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
