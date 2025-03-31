"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

const data = [
  {
    name: "Mon",
    sales: 1200,
    visitors: 3500,
    conversion: 34,
  },
  {
    name: "Tue",
    sales: 1800,
    visitors: 4200,
    conversion: 43,
  },
  {
    name: "Wed",
    sales: 2400,
    visitors: 5100,
    conversion: 47,
  },
  {
    name: "Thu",
    sales: 2100,
    visitors: 4800,
    conversion: 44,
  },
  {
    name: "Fri",
    sales: 2700,
    visitors: 5600,
    conversion: 48,
  },
];

// Calculate totals and averages
const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
const averageConversion = ((totalSales / totalVisitors) * 100).toFixed(1);

const chartTypes = ["bar", "line", "area"];

const EcommerceChart = () => {
  const [activeChart, setActiveChart] = useState("bar");
  const [activeMetric, setActiveMetric] = useState(null);

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

  const renderChart = () => {
    switch (activeChart) {
      case "line":
        return (
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eee"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              tickFormatter={(value) =>
                `${value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
              formatter={(value, name) => [
                name === "visitors"
                  ? value.toLocaleString()
                  : `$${value.toLocaleString()}`,
                typeof name === "string"
                  ? name.charAt(0).toUpperCase() + name.slice(1)
                  : name,
              ]}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "30px" }}
              formatter={(value) => (
                <span className="text-sm font-medium">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        );
      case "area":
        return (
          <AreaChart width={500} height={300} data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eee"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              tickFormatter={(value) =>
                `${value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
              formatter={(value, name) => [
                name === "visitors"
                  ? value.toLocaleString()
                  : `$${value.toLocaleString()}`,
                typeof name === "string"
                  ? name.charAt(0).toUpperCase() + name.slice(1)
                  : name,
              ]}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "30px" }}
              formatter={(value) => (
                <span className="text-sm font-medium">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="sales"
              fill="#EEF2FF"
              stroke="#4F46E5"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              fill="#ECFDF5"
              stroke="#10B981"
              strokeWidth={2}
            />
          </AreaChart>
        );
      default:
        return (
          <BarChart width={500} height={300} data={data} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eee"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              tickFormatter={(value) =>
                `${value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
              formatter={(value, name) => [
                name === "visitors"
                  ? value.toLocaleString()
                  : `$${value.toLocaleString()}`,
                typeof name === "string"
                  ? name.charAt(0).toUpperCase() + name.slice(1)
                  : name,
              ]}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "30px" }}
              formatter={(value) => (
                <span className="text-sm font-medium">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            />
            <Bar
              dataKey="sales"
              fill="#4F46E5"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              isAnimationActive={true}
            />
            <Bar
              dataKey="visitors"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              isAnimationActive={true}
            />
          </BarChart>
        );
    }
  };

  return (
    <motion.div
      className=" rounded-lg p-6 h-full "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex justify-between items-center mb-4"
        variants={itemVariants}
      >
        <motion.h1
          className="text-2xl font-bold text-indigo-700 dark:text-indigo-300"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Weekly Performance
        </motion.h1>

        <div className="flex items-center gap-2">
          {chartTypes.map((type) => (
            <motion.button
              key={type}
              className={`px-3 py-1 text-xs rounded-full ${
                activeChart === type
                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveChart(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}

          <motion.button
            className="text-gray-600 dark:text-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full ml-2"
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
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-4 mb-6"
        variants={itemVariants}
      >
        <motion.div
          className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-3"
          whileHover={{
            y: -5,
            boxShadow: "0 8px 20px rgba(79, 70, 229, 0.15)",
          }}
          onHoverStart={() => setActiveMetric("sales")}
          onHoverEnd={() => setActiveMetric(null)}
        >
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Sales
          </div>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
            ${totalSales.toLocaleString()}
          </div>
        </motion.div>

        <motion.div
          className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-3"
          whileHover={{
            y: -5,
            boxShadow: "0 8px 20px rgba(16, 185, 129, 0.15)",
          }}
          onHoverStart={() => setActiveMetric("visitors")}
          onHoverEnd={() => setActiveMetric(null)}
        >
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Visitors
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-300">
            {totalVisitors.toLocaleString()}
          </div>
        </motion.div>

        <motion.div
          className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3"
          whileHover={{
            y: -5,
            boxShadow: "0 8px 20px rgba(245, 158, 11, 0.15)",
          }}
          onHoverStart={() => setActiveMetric("conversion")}
          onHoverEnd={() => setActiveMetric(null)}
        >
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Conversion Rate
          </div>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-300">
            {averageConversion}%
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="h-64 md:h-72"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default EcommerceChart;
