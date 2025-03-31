"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const UserCard = ({ type, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Check if user prefers dark theme
  useEffect(() => {
    // Check system preference initially
    if (typeof window !== "undefined") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      setIsDarkTheme(darkModeMediaQuery.matches);

      // Add listener for theme changes
      const handleThemeChange = (e) => {
        setIsDarkTheme(e.matches);
      };

      darkModeMediaQuery.addEventListener("change", handleThemeChange);

      return () => {
        darkModeMediaQuery.removeEventListener("change", handleThemeChange);
      };
    }
  }, []);

  // Determine color scheme based on index for rotating colors
  const getColorScheme = () => {
    const colorSchemes = [
      {
        icon: isDarkTheme ? "bg-blue-900/30" : "bg-blue-100",
        text: isDarkTheme ? "text-blue-400" : "text-blue-600",
        glow: isDarkTheme ? "bg-blue-900/10" : "",
      },
      {
        icon: isDarkTheme ? "bg-purple-900/30" : "bg-purple-100",
        text: isDarkTheme ? "text-purple-400" : "text-purple-600",
        glow: isDarkTheme ? "bg-purple-900/10" : "",
      },
      {
        icon: isDarkTheme ? "bg-green-900/30" : "bg-green-100",
        text: isDarkTheme ? "text-green-400" : "text-green-600",
        glow: isDarkTheme ? "bg-green-900/10" : "",
      },
      {
        icon: isDarkTheme ? "bg-amber-900/30" : "bg-amber-100",
        text: isDarkTheme ? "text-amber-400" : "text-amber-600",
        glow: isDarkTheme ? "bg-amber-900/10" : "",
      },
      {
        icon: isDarkTheme ? "bg-rose-900/30" : "bg-rose-100",
        text: isDarkTheme ? "text-rose-400" : "text-rose-600",
        glow: isDarkTheme ? "bg-rose-900/10" : "",
      },
    ];

    // Use modulo to cycle through the color schemes
    return colorSchemes[index % colorSchemes.length];
  };

  const colorScheme = getColorScheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`p-6 backdrop-blur-md rounded-2xl border flex flex-col min-w-[300px] relative overflow-hidden ${colorScheme.glow}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{
        y: -5,
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Blur effect in corner */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-xl`}
      />

      <motion.div
        className="flex items-start justify-start relative z-10"
        variants={itemVariants}
      >
        <motion.span
          className={`text-[10px] ${
            isDarkTheme
              ? "bg-gray-900 text-gray-300"
              : "bg-gray-100 text-gray-600"
          } px-2 py-1 rounded-full`}
          whileHover={{ scale: 1.1 }}
        >
          2024/25
        </motion.span>
      </motion.div>

      <motion.h1
        className={`text-2xl font-semibold my-4 relative z-10 ${
          isHovered ? colorScheme.text : ""
        }`}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
      >
        1,234
      </motion.h1>

      <motion.h2
        className={`capitalize text-lg font-medium relative z-10`}
        variants={itemVariants}
      >
        {type}s
      </motion.h2>
    </motion.div>
  );
};

export default UserCard;
