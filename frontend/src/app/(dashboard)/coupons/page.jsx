// app/dashboard/coupons/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import DeleteModal from "./components/DeleteModal";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

// Mock data - replace with API call in the future
const mockCoupons = [
  {
    id: "1",
    code: "SUMMER25",
    type: "percentage",
    value: 25,
    minPurchase: 100,
    validFrom: new Date("2025-05-01"),
    validUntil: new Date("2025-08-31"),
    usageLimit: 1000,
    usageCount: 243,
    isActive: true,
    appliesTo: "all",
    createdAt: new Date("2025-04-15"),
    updatedAt: new Date("2025-04-15"),
  },
  {
    id: "2",
    code: "FREESHIP",
    type: "shipping",
    value: 0,
    minPurchase: 50,
    validFrom: new Date("2025-01-01"),
    validUntil: new Date("2025-12-31"),
    usageCount: 512,
    isActive: true,
    appliesTo: "all",
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2025-01-10"),
  },
  {
    id: "3",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minPurchase: 50,
    validFrom: new Date("2025-05-01"),
    validUntil: new Date("2025-08-31"),
    usageLimit: 1000,
    usageCount: 243,
    isActive: true,
    appliesTo: "all",
    createdAt: new Date("2025-04-15"),
    updatedAt: new Date("2025-04-15"),
  },
  {
    id: "4",
    code: "FALL15",
    type: "percentage",
    value: 15,
    minPurchase: 100,
    validFrom: new Date("2025-09-01"),
    validUntil: new Date("2025-11-30"),
    usageLimit: 1000,
    usageCount: 45,
    isActive: true,
    appliesTo: "all",
    createdAt: new Date("2025-04-15"),
    updatedAt: new Date("2025-04-15"),
  },
  {
    id: "5",
    code: "HOLIDAY20",
    type: "percentage",
    value: 20,
    minPurchase: 150,
    validFrom: new Date("2025-12-01"),
    validUntil: new Date("2025-12-31"),
    usageLimit: 500,
    usageCount: 0,
    isActive: false,
    appliesTo: "all",
    createdAt: new Date("2025-04-15"),
    updatedAt: new Date("2025-04-15"),
  },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [deleteId, setDeleteId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    // Add listener for changes
    const handleDarkModeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  const handleDelete = (id) => {
    // Here you would make an API call to delete the coupon
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
    setDeleteId(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div
      className={`px-4 sm:px-6 lg:px-8 py-8 min-h-full bg-white transition-colors duration-200`}
    >
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className={`text-3xl font-bold`}>Coupons</h1>
          <p className={`mt-2 text-sm`}>
            Manage your discount coupons and promotions
          </p>
        </div>
        <Link href="/coupons/add">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Coupon
          </motion.button>
        </Link>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className={`overflow-hidden shadow-md rounded-lg border `}>
              <table className="min-w-full divide-y ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6`}
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm font-semibold `}
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm font-semibold `}
                    >
                      Value
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm font-semibold `}
                    >
                      Valid Until
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm font-semibold`}
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y`}>
                  {coupons.map((coupon, index) => (
                    <motion.tr
                      key={coupon.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`${
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"
                      } transition-colors duration-150`}
                    >
                      <td
                        className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium ${
                          isDarkMode ? "text-gray-200" : "text-gray-900"
                        } sm:pl-6`}
                      >
                        <span
                          className={`font-mono ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-100"
                          } px-2 py-1 rounded`}
                        >
                          {coupon.code}
                        </span>
                      </td>
                      <td
                        className={`whitespace-nowrap px-3 py-4 text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <span className="capitalize">{coupon.type}</span>
                      </td>
                      <td
                        className={`whitespace-nowrap px-3 py-4 text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {coupon.type === "percentage" ? (
                          <span className="text-amber-600 dark:text-amber-400 font-medium">
                            {coupon.value}%
                          </span>
                        ) : coupon.type === "fixed" ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            ${coupon.value}
                          </span>
                        ) : coupon.type === "shipping" ? (
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            Free Shipping
                          </span>
                        ) : (
                          <span className="text-purple-600 dark:text-purple-400 font-medium">
                            Buy X Get {coupon.value}
                          </span>
                        )}
                      </td>
                      <td
                        className={`whitespace-nowrap px-3 py-4 text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {formatDate(coupon.validUntil)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            coupon.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {coupon.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/coupons/${coupon.id}`}
                            className={`p-1.5 ${
                              isDarkMode
                                ? "bg-blue-900 text-blue-300"
                                : "bg-blue-50 text-blue-600"
                            } rounded-md ${
                              isDarkMode
                                ? "hover:bg-blue-800"
                                : "hover:bg-blue-100"
                            } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/coupons/${coupon.id}/edit`}
                            className={`p-1.5 ${
                              isDarkMode
                                ? "bg-amber-900 text-amber-300"
                                : "bg-amber-50 text-amber-600"
                            } rounded-md ${
                              isDarkMode
                                ? "hover:bg-amber-800"
                                : "hover:bg-amber-100"
                            } transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1`}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(coupon.id)}
                            className={`p-1.5 ${
                              isDarkMode
                                ? "bg-red-900 text-red-300"
                                : "bg-red-50 text-red-600"
                            } rounded-md ${
                              isDarkMode
                                ? "hover:bg-red-800"
                                : "hover:bg-red-100"
                            } transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1`}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination (Optional) */}
      <div className="mt-6 flex items-center justify-between">
        <div
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{coupons.length}</span> of{" "}
          <span className="font-medium">{coupons.length}</span> coupons
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1.5 border ${
              isDarkMode
                ? "border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            } rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Previous
          </button>
          <button
            className={`px-3 py-1.5 border ${
              isDarkMode
                ? "border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            } rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Next
          </button>
        </div>
      </div>

      {deleteId && (
        <DeleteModal
          onDelete={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
