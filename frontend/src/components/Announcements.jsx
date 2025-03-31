"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Announcements = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const announcements = [
    {
      id: 1,
      title: "Spring Season Sale",
      date: "2025-03-15",
      description:
        "25% discount on all spring collection items. Active across all store categories and online channels.",
      color: "bg-indigo-50 dark:bg-indigo-950/30",
      borderColor: "border-indigo-400 dark:border-indigo-600",
    },
    {
      id: 2,
      title: "Free Shipping Campaign",
      date: "2025-03-01",
      description:
        "Free shipping on all orders above $50. Campaign performing well with 15% increase in average order value.",
      color: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-400 dark:border-purple-600",
    },
    {
      id: 3,
      title: "New Product Launch",
      date: "2025-02-20",
      description:
        "Premium headphones collection launch. Marketing materials distributed to all channels, inventory stocked.",
      color: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-400 dark:border-amber-600",
    },
  ];

  return (
    <motion.div
      className="p-6 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex items-center justify-between mb-5">
        <motion.h1
          className="text-2xl font-bold text-indigo-700 dark:text-indigo-300"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Promotions
        </motion.h1>
        <motion.span
          className="text-sm text-indigo-500 cursor-pointer hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          View All →
        </motion.span>
      </div>

      <AnimatePresence>
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
        >
          {announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              className={`rounded-md p-4 shadow-sm border-l-4 ${announcement.color} ${announcement.borderColor}`}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 },
              }}
              onClick={() =>
                setExpandedItem(
                  expandedItem === announcement.id ? null : announcement.id
                )
              }
            >
              <div className="flex items-center justify-between">
                <motion.h2
                  className="font-medium text-indigo-800 dark:text-indigo-200"
                  whileHover={{ x: 2 }}
                >
                  {announcement.title}
                </motion.h2>
                <motion.span
                  className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 rounded-full px-2 py-1 border border-indigo-100 dark:border-indigo-700"
                  whileHover={{ y: -2 }}
                >
                  {announcement.date}
                </motion.span>
              </div>

              <AnimatePresence>
                <motion.p
                  className="text-sm text-gray-600 dark:text-gray-300 mt-2"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {announcement.description}
                </motion.p>
              </AnimatePresence>

              {expandedItem === announcement.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  <motion.button
                    className="text-xs bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-1 px-3 rounded-full mr-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    className="text-xs bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 py-1 px-3 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Announcements;
