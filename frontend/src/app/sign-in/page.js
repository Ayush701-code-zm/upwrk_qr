"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";
import apiClient from "@/lib/apiClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        // Use the login function from AuthProvider
        login(response.data.user, response.data.token);
      } else {
        throw new Error("No token received from server");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred during sign in"
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hidden md:block bg-indigo-50 relative h-full">
          <Image
            src="/logo.png"
            alt="Login Illustration"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Login Form Section */}
        <motion.div
          className="p-8 md:p-12 flex flex-col justify-center"
          variants={itemVariants}
        >
          <motion.h1
            className="text-3xl font-bold text-center text-indigo-600 mb-8"
            variants={itemVariants}
          >
            Welcome Back
          </motion.h1>

          {error && (
            <motion.div
              className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={loading}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className={`w-full bg-indigo-600 text-white py-3 rounded-lg transition-colors duration-300 text-lg font-semibold ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-indigo-700"
                }`}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </motion.div>
          </form>

          <motion.div
            className="text-center mt-6 space-y-4"
            variants={itemVariants}
          >
            <a
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:underline block"
            >
              Forgot Password?
            </a>

            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Sign Up
              </a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
