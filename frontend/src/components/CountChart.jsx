"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const ProductQRChart = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Data using colors that will work with CSS variables
  const data = [
    {
      name: "Total",
      count: 15000,
      fill: "#F3F4F6", // Light gray in light mode
    },
    {
      name: "With QR",
      count: 9000,
      fill: "#4F46E5", // Indigo in light mode
    },
    {
      name: "Without QR",
      count: 6000,
      fill: "#10B981", // Emerald in light mode
    },
  ];

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

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.15, rotate: 5, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="rounded-xl w-full h-full p-4 transition-colors duration-300 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* TITLE */}
      <motion.div
        className="flex justify-between items-center mb-2"
        variants={itemVariants}
      >
        <motion.h1
          className="text-lg font-semibold text-indigo-700 dark:text-indigo-300"
          whileHover={{ scale: 1.03 }}
        >
          Product Sales
        </motion.h1>
        <motion.button
          className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 p-1 rounded-full"
          whileHover={{ rotate: 90, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </motion.button>
      </motion.div>

      {/* CHART */}
      <motion.div
        className="relative w-full h-[75%] flex items-center justify-center"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-full h-full absolute top-0 left-0">
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="100%"
              barSize={32}
              data={data}
              startAngle={-270}
              endAngle={90}
            >
              <RadialBar
                background
                dataKey="count"
                animationDuration={1500}
                isAnimationActive={true}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Center icon absolutely positioned */}
        <motion.div
          className="absolute z-10 bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm"
          initial="initial"
          whileHover="hover"
          variants={iconVariants}
        >
          {/* Product with QR Tag illustration */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Product Tag */}
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              fill="#f3f4f6"
              stroke="#4F46E5"
              strokeWidth="1"
              className="dark:fill-gray-700 dark:stroke-indigo-400"
            />

            {/* QR Code on Tag */}
            <rect
              x="5"
              y="7"
              width="6"
              height="6"
              rx="1"
              fill="#4F46E5"
              className="dark:fill-indigo-400"
            />
            <rect
              x="6"
              y="8"
              width="2"
              height="2"
              fill="white"
              className="dark:fill-gray-800"
            />
            <rect
              x="9"
              y="8"
              width="1"
              height="1"
              fill="white"
              className="dark:fill-gray-800"
            />
            <rect
              x="6"
              y="11"
              width="1"
              height="1"
              fill="white"
              className="dark:fill-gray-800"
            />
            <rect
              x="8"
              y="11"
              width="2"
              height="1"
              fill="white"
              className="dark:fill-gray-800"
            />

            {/* Product Details */}
            <line
              x1="13"
              y1="8"
              x2="17"
              y2="8"
              stroke="#4F46E5"
              strokeWidth="1"
              className="dark:stroke-indigo-400"
            />
            <line
              x1="13"
              y1="11"
              x2="17"
              y2="11"
              stroke="#4F46E5"
              strokeWidth="1"
              className="dark:stroke-indigo-400"
            />
            <line
              x1="5"
              y1="15"
              x2="17"
              y2="15"
              stroke="#4F46E5"
              strokeWidth="1"
              className="dark:stroke-indigo-400"
            />
            <line
              x1="5"
              y1="17"
              x2="13"
              y2="17"
              stroke="#4F46E5"
              strokeWidth="1"
              className="dark:stroke-indigo-400"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* BOTTOM */}
      <motion.div
        className="flex justify-center gap-16 mt-4"
        variants={itemVariants}
      >
        <motion.div
          className="flex flex-col gap-1 items-center"
          whileHover={{ y: -5, scale: 1.05 }}
          onHoverStart={() => setActiveSection("qr")}
          onHoverEnd={() => setActiveSection(null)}
        >
          <motion.div
            className="w-5 h-5 bg-indigo-600 dark:bg-indigo-500 rounded-full"
            whileHover={{ scale: 1.2 }}
            animate={{
              scale: activeSection === "qr" ? [1, 1.2, 1] : 1,
              transition: {
                duration: 0.5,
                repeat: activeSection === "qr" ? 1 : 0,
              },
            }}
          />
          <motion.h1
            className="font-bold text-indigo-800 dark:text-indigo-200"
            animate={{
              transition: { duration: 0.3 },
            }}
          >
            9,000
          </motion.h1>
          <motion.h2 className="text-xs text-gray-600 dark:text-gray-300">
            With QR (60%)
          </motion.h2>
        </motion.div>

        <motion.div
          className="flex flex-col gap-1 items-center"
          whileHover={{ y: -5, scale: 1.05 }}
          onHoverStart={() => setActiveSection("noqr")}
          onHoverEnd={() => setActiveSection(null)}
        >
          <motion.div
            className="w-5 h-5 bg-emerald-500 dark:bg-emerald-400 rounded-full"
            whileHover={{ scale: 1.2 }}
            animate={{
              scale: activeSection === "noqr" ? [1, 1.2, 1] : 1,
              transition: {
                duration: 0.5,
                repeat: activeSection === "noqr" ? 1 : 0,
              },
            }}
          />
          <motion.h1
            className="font-bold text-indigo-800 dark:text-indigo-200"
            animate={{
              transition: { duration: 0.3 },
            }}
          >
            6,000
          </motion.h1>
          <motion.h2 className="text-xs text-gray-600 dark:text-gray-300">
            Without QR (40%)
          </motion.h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductQRChart;
