"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { Moon, Sun } from "lucide-react";

export default function AddCouponPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const initialFormData = {
    code: "",
    type: "percentage", // Fixed to percentage only
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

  useEffect(() => {
    // Check for user preference in localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

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
    setIsSubmitting(true);
    setError("");

    try {
      // Format dates for API
      const apiFormData = {
        ...formData,
        validFrom: formData.validFrom.toISOString(),
        validUntil: formData.validUntil.toISOString(),
      };

      // Call the API endpoint to create the coupon
      const response = await apiClient.post("/api/coupons", apiFormData);

      toast.success("Coupon created successfully!");

      // Redirect to coupons list page
      router.push("/coupons");
    } catch (error) {
      console.error("Error creating coupon:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create coupon. Please try again."
      );
      toast.error(error.response?.data?.message || "Failed to create coupon");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic classNames based on theme
  const pageClass = darkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-100 text-gray-800";
  const cardClass = darkMode ? "bg-gray-800 shadow" : "bg-white shadow";
  const headingClass = darkMode ? "text-gray-100" : "text-gray-900";
  const subTextClass = darkMode ? "text-gray-400" : "text-gray-500";
  const inputClass = darkMode
    ? "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-600 rounded-md p-3 bg-gray-700 text-gray-200 placeholder-gray-500"
    : "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-2 border-gray-300 rounded-md p-3 bg-white text-gray-700 placeholder-gray-400";
  const readOnlyClass = darkMode
    ? "shadow-sm bg-gray-600 block w-full text-base border-2 border-gray-600 rounded-md p-3 text-gray-300"
    : "shadow-sm bg-gray-200 block w-full text-base border-2 border-gray-300 rounded-md p-3 text-gray-600";
  const checkboxBgClass = darkMode ? "bg-gray-700" : "bg-gray-100";
  const checkboxLabelClass = darkMode ? "text-gray-200" : "text-gray-700";
  const buttonPrimaryClass =
    "inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed";
  const buttonSecondaryClass = darkMode
    ? "py-3 px-6 border-2 border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    : "py-3 px-6 border-2 border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  const errorBgClass = darkMode
    ? "bg-red-900 border-red-700"
    : "bg-red-100 border-red-300";
  const errorTextClass = darkMode ? "text-red-300" : "text-red-700";
  const themeButtonClass = darkMode
    ? "p-2 rounded-full bg-gray-700 text-yellow-400 hover:bg-gray-600"
    : "p-2 rounded-full bg-gray-200 text-indigo-600 hover:bg-gray-300";

  return (
    <div
      className={`px-4 sm:px-6 lg:px-8 py-8 ${pageClass} transition-colors duration-200`}
    >
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className={`text-2xl font-semibold ${headingClass}`}>
            Add New Coupon
          </h1>
          <p className={`mt-2 text-sm ${subTextClass}`}>
            Create a new percentage discount coupon for your customers
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {/* <button
            onClick={toggleTheme}
            className={themeButtonClass}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button> */}
          <Link href="/coupons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={buttonSecondaryClass}
            >
              Back to List
            </motion.button>
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${cardClass} overflow-hidden sm:rounded-lg p-6`}
      >
        {error && (
          <div className={`mb-4 p-4 ${errorBgClass} border rounded-md`}>
            <p className={errorTextClass}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="code"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
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
                  className={inputClass}
                  placeholder="SUMMER25"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="type"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                Coupon Type
              </label>
              <div>
                <input
                  type="text"
                  id="type"
                  value="Percentage Discount"
                  readOnly
                  className={readOnlyClass}
                />
                <input type="hidden" name="type" value="percentage" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="value"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
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
                  value={formData.value}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="minPurchase"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
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
                  className={inputClass}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="maxDiscount"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
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
                  className={inputClass}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="validFrom"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                Valid From
              </label>
              <div>
                <input
                  type="text"
                  name="validFrom"
                  id="validFrom"
                  required
                  value={formatDateToAmerican(formData.validFrom)}
                  onChange={handleChange}
                  placeholder="MM/DD/YYYY"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="validUntil"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                Valid Until
              </label>
              <div>
                <input
                  type="text"
                  name="validUntil"
                  id="validUntil"
                  required
                  value={formatDateToAmerican(formData.validUntil)}
                  onChange={handleChange}
                  placeholder="MM/DD/YYYY"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="usageLimit"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
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
                  className={inputClass}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="appliesTo"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
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
                  className={inputClass}
                >
                  <option value="all">All Products</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <div
                className={`flex items-center p-4 ${checkboxBgClass} rounded-lg`}
              >
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-500 rounded"
                />
                <label
                  htmlFor="isActive"
                  className={`ml-3 block text-base font-medium ${checkboxLabelClass}`}
                >
                  Active
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Link href="/coupons">
              <button type="button" className={buttonSecondaryClass}>
                Cancel
              </button>
            </Link>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={buttonPrimaryClass}
            >
              {isSubmitting ? "Processing..." : "Create Coupon"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
