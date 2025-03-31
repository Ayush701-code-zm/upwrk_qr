"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  Bar,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
    profit: 1600,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
    profit: 1602,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
    profit: -7800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
    profit: -1128,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
    profit: -2910,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
    profit: -1410,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
    profit: -810,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
    profit: -810,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
    profit: -810,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
    profit: -810,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
    profit: -810,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
    profit: -810,
  },
];

const chartTypes = ["line", "area", "composed"];

const FinanceChart = () => {
  const [activeChart, setActiveChart] = useState("line");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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

  const renderChart = () => {
    switch (activeChart) {
      case "area":
        return (
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              tickMargin={20}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
            />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#4F46E5"
              fill="#DBEAFE"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#9333EA"
              fill="#F3E8FF"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        );
      case "composed":
        return (
          <ComposedChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              tickMargin={20}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
            />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
            />
            <Bar dataKey="income" fill="#4F46E5" barSize={20} />
            <Bar dataKey="expense" fill="#9333EA" barSize={20} />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#D97706"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        );
      default:
        return (
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              tickMargin={20}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
            />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 4, fill: "#4F46E5" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#9333EA"
              strokeWidth={3}
              dot={{ r: 4, fill: "#9333EA" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <motion.div
      className="p-6 h-full w-full max-w-full overflow-hidden flex flex-col"
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
          Finance Overview
        </motion.h1>
        <div className="flex items-center gap-2">
          {chartTypes.map((type) => (
            <motion.button
              key={type}
              className={`text-xs ${
                activeChart === type
                  ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              } px-3 py-1 rounded-full`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveChart(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        className="flex-1 border rounded-md p-4 "
        variants={itemVariants}
        whileHover={{
          scale: 1.01,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          transition: { duration: 0.2 },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default FinanceChart;
