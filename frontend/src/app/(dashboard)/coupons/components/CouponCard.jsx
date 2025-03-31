"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CouponCard({ coupon, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
    >
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{coupon.code}</h3>
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              coupon.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {coupon.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
      <div className="px-4 py-4 sm:p-6">
        <dl>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {coupon.type.charAt(0).toUpperCase() + coupon.type.slice(1)}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Value</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {coupon.type === "percentage"
                  ? `${coupon.value}%`
                  : coupon.type === "fixed"
                  ? `$${coupon.value}`
                  : coupon.type === "shipping"
                  ? "Free Shipping"
                  : `Buy X Get ${coupon.value}`}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Valid Until</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(coupon.validUntil)}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Usage</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {coupon.usageCount} used
                {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
              </dd>
            </div>
          </div>
        </dl>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link href={`/dashboard/coupons/${coupon.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View
            </motion.button>
          </Link>
          <div className="flex space-x-2">
            <Link href={`/dashboard/coupons/${coupon.id}/edit`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(coupon.id)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
