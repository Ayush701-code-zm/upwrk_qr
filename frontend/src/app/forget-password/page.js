"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add forgot password logic here
    console.log("Password reset requested for", email);
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Image Section */}
        <div className="hidden md:block bg-indigo-50">
          <motion.img
            src="/api/placeholder/600/800"
            alt="Forgot Password Illustration"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Forgot Password Form Section */}
        <motion.div
          className="p-8 md:p-12 flex flex-col justify-center"
          variants={itemVariants}
        >
          {!emailSent ? (
            <>
              <motion.h1
                className="text-3xl font-bold text-center text-indigo-600 mb-4"
                variants={itemVariants}
              >
                Forgot Password
              </motion.h1>

              <motion.p
                className="text-center text-gray-600 mb-8"
                variants={itemVariants}
              >
                Enter your email to reset your password
              </motion.p>

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
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Reset Password
                  </button>
                </motion.div>
              </form>

              <motion.div
                className="text-center mt-6 text-sm"
                variants={itemVariants}
              >
                Remember your password?{" "}
                <a href="/login" className="text-indigo-600 hover:underline">
                  Login
                </a>
              </motion.div>
            </>
          ) : (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.h1
                className="text-3xl font-bold text-indigo-600 mb-4"
                variants={itemVariants}
              >
                Check Your Email
              </motion.h1>

              <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
                We've sent a password reset link to {email}. Please check your
                inbox and follow the instructions.
              </motion.p>

              <motion.div variants={itemVariants}>
                <a
                  href="/login"
                  className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 inline-block"
                >
                  Back to Login
                </a>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
