"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { Lock, Mail, User } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const API_URL = "http://localhost:4000/api/auth/sign-up";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "confirmPassword" || name === "password") {
      setPasswordMatch(
        name === "password"
          ? value === formData.confirmPassword
          : value === formData.password
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!passwordMatch) {
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      setSuccess("Signup successful! Please login.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hidden md:block bg-indigo-50">
          <motion.img
            src="/api/placeholder/600/800"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            Create Account
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              {!passwordMatch && (
                <p className="text-red-500 text-sm mt-2">
                  Passwords do not match.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              disabled={!passwordMatch}
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
