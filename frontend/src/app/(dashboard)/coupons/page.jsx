// app/dashboard/coupons/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import DeleteModal from "./components/DeleteModal";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  AlertCircle,
  Loader2,
  Search,
  Filter,
} from "lucide-react";
import apiClient from "@/lib/apiClient";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [filters, setFilters] = useState({
    isActive: undefined,
    type: "",
    search: "",
  });

  // Fetch coupons from the API
  const fetchCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query params
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
      });

      // Add filters if they exist
      if (filters.isActive !== undefined) {
        params.append("isActive", filters.isActive);
      }
      if (filters.type) {
        params.append("type", filters.type);
      }
      if (filters.search) {
        params.append("search", filters.search);
      }

      const response = await apiClient.get(`/api/coupons?${params.toString()}`);
      setCoupons(response.data.data);
      setPagination({
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.total,
        pages: response.data.pagination.pages,
      });
    } catch (err) {
      console.error("Error fetching coupons:", err);
      setError("Failed to load coupons. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch coupons on initial load and when pagination or filters change
  useEffect(() => {
    fetchCoupons();
  }, [pagination.page, pagination.limit, filters]);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  // Handle delete coupon
  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      // Add a timeout to ensure the delete modal displays the loading state
      await new Promise((resolve) => setTimeout(resolve, 300));

      const response = await apiClient.delete(`/api/coupons/${id}`);

      // Check if the response is successful
      if (response.status >= 200 && response.status < 300) {
        // Wait for the delete operation to complete before refreshing
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Refresh the coupons list after deletion
        await fetchCoupons();
        setDeleteId(null);
      } else {
        throw new Error(`Server responded with status code ${response.status}`);
      }
    } catch (err) {
      console.error("Error deleting coupon:", err);
      setError("Failed to delete coupon. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Format date from ISO string to MM/DD/YYYY
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Handle filter changes with debouncing for search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, search: value }));
    // We'll let the Enter key press handle the actual search
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on search
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      isActive: undefined,
      type: "",
      search: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 h-auto bg-white dark:bg-gray-900 w-full transition-colors duration-200">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Coupons
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your discount coupons and promotions
          </p>
        </div>
        <Link href="/coupons/add">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Coupon
          </motion.button>
        </Link>
      </div>

      {/* Improved Filter controls */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter Coupons
          </h3>
          {(filters.isActive !== undefined ||
            filters.type ||
            filters.search) && (
            <button
              onClick={resetFilters}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label
              htmlFor="statusFilter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Status
            </label>
            <select
              id="statusFilter"
              className="block w-full h-8 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={
                filters.isActive === undefined
                  ? ""
                  : filters.isActive.toString()
              }
              onChange={(e) => {
                const value = e.target.value;
                setFilters((prev) => ({
                  ...prev,
                  isActive: value === "" ? undefined : value === "true",
                }));
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label
              htmlFor="typeFilter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Type
            </label>
            <select
              id="typeFilter"
              className="block w-full h-8 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={filters.type}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, type: e.target.value }));
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
            >
              <option value="">All Types</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
              <option value="shipping">Shipping</option>
            </select>
          </div>

          {/* Search Filter */}
          <div>
            <label
              htmlFor="searchFilter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                id="searchFilter"
                className="block w-full h-8 pl-10 rounded-md border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Search by code"
                value={filters.search}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  onClick={handleSearchSubmit}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                >
                  <span className="sr-only">Search</span>
                  {/* Use a small search button */}
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 flex items-center text-red-700 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="mt-8 flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading coupons...
          </span>
        </div>
      ) : (
        <div className="mt-6 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
                {coupons.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                    No coupons found. Create a new coupon to get started.
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6"
                        >
                          Code
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                        >
                          Value
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                        >
                          Valid Until
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
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
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                      {coupons.map((coupon, index) => (
                        <motion.tr
                          key={coupon.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-6">
                            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {coupon.code}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                            <span className="capitalize">{coupon.type}</span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                            {coupon.type === "percentage" ? (
                              <span className="text-amber-600 dark:text-amber-500 font-medium">
                                {coupon.value}%
                              </span>
                            ) : coupon.type === "fixed" ? (
                              <span className="text-emerald-600 dark:text-emerald-500 font-medium">
                                ${coupon.value}
                              </span>
                            ) : coupon.type === "shipping" ? (
                              <span className="text-blue-600 dark:text-blue-500 font-medium">
                                Free Shipping
                              </span>
                            ) : (
                              <span className="text-purple-600 dark:text-purple-500 font-medium">
                                Buy X Get {coupon.value}
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                            {formatDate(coupon.valid_until)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                coupon.is_active
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {coupon.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end space-x-2">
                              <Link
                                href={`/coupons/${coupon.id}/edit`}
                                className="p-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:ring-offset-1 dark:focus:ring-offset-gray-900"
                                title="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={() => setDeleteId(coupon.id)}
                                className="p-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-1 dark:focus:ring-offset-gray-900"
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
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && coupons.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium">
              {(pagination.page - 1) * pagination.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{" "}
            of <span className="font-medium">{pagination.total}</span> coupons
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Improved Delete Modal handling */}
      {deleteId && (
        <DeleteModal
          onDelete={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
          isLoading={deleteLoading}
        />
      )}
    </div>
  );
}
