"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion, AnimatePresence } from "framer-motion";

const EventCalendar = () => {
  const [value, onChange] = useState(new Date());
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

  // Admin-focused events with matching style from the Announcements component
  const events = [
    {
      id: 1,
      title: "Inventory Restock",
      date: "10:00 AM - 2:00 PM",
      description:
        "Restock of summer collection items. Warehouse team prepared.",
      color: "bg-indigo-50 dark:bg-indigo-950/30",
      borderColor: "border-indigo-400 dark:border-indigo-600",
    },
    {
      id: 2,
      title: "Marketing Campaign Launch",
      date: "9:00 AM - 11:00 AM",
      description:
        "Spring sale campaign goes live across all digital channels.",
      color: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-400 dark:border-purple-600",
    },
    {
      id: 3,
      title: "Vendor Meeting",
      date: "3:00 PM - 4:30 PM",
      description: "Review new product samples with clothing manufacturer.",
      color: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-400 dark:border-amber-600",
    },
  ];

  // Custom CSS for calendar in dark mode
  useEffect(() => {
    // Add dynamic styles for react-calendar
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      .react-calendar {
        width: 100% !important;
        max-width: none !important;
        background-color: var(--tw-bg-opacity, 1);
        border-color: #e5e7eb;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        
        padding: 0.75rem;
      }
      .dark .react-calendar {
        background-color: #1F2937;
        color: #E5E7EB;
        border-color: #374151;
      }
      .react-calendar__tile {
        padding: 0.75em 0.5em;
        height: auto;
      }
      .react-calendar__tile:hover {
        background-color: #e6e6e6;
      }
      .dark .react-calendar__tile:hover {
        background-color: #374151;
      }
      .react-calendar__tile--active {
        background-color: #4F46E5 !important;
        color: white;
      }
      .react-calendar__navigation {
        height: 35px;
        margin-bottom: 0.5rem;
      }
      .react-calendar__navigation button {
        min-width: 35px;
        background: none;
      }
      .react-calendar__navigation button:enabled:hover,
      .react-calendar__navigation button:enabled:focus {
        background-color: #e6e6e6;
      }
      .dark .react-calendar__navigation button:enabled:hover,
      .dark .react-calendar__navigation button:enabled:focus {
        background-color: #374151;
      }
      .react-calendar__month-view__days__day--weekend {
        color: #d10000;
      }
      .dark .react-calendar__month-view__days__day--weekend {
        color: #FCA5A5;
      }
      .react-calendar__month-view__days__day--neighboringMonth {
        color: #757575;
      }
      .dark .react-calendar__month-view__days__day--neighboringMonth {
        color: #6B7280;
      }
      .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.8em;
      }
      .react-calendar__month-view__weekdays__weekday {
        padding: 0.5rem;
      }
      .react-calendar__month-view__weekdays__weekday abbr {
        text-decoration: none;
      }
    `;

    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <motion.div
      className="p-6 w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Calendar onChange={onChange} value={value} className="w-full" />
      </motion.div>

      <div className="flex items-center justify-between my-6">
        <motion.h1
          className="text-2xl font-bold text-indigo-700 dark:text-indigo-300"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Scheduled Tasks
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
          {events.map((event) => (
            <motion.div
              key={event.id}
              className={`rounded-md p-4 shadow-sm border-l-4 ${event.color} ${event.borderColor}`}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 },
              }}
              onClick={() =>
                setExpandedItem(expandedItem === event.id ? null : event.id)
              }
            >
              <div className="flex items-center justify-between">
                <motion.h2
                  className="font-medium text-indigo-800 dark:text-indigo-200"
                  whileHover={{ x: 2 }}
                >
                  {event.title}
                </motion.h2>
                <motion.span
                  className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 rounded-full px-2 py-1 border border-indigo-100 dark:border-indigo-700"
                  whileHover={{ y: -2 }}
                >
                  {event.date}
                </motion.span>
              </div>

              <AnimatePresence>
                <motion.p
                  className="text-sm text-gray-600 dark:text-gray-300 mt-2"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {event.description}
                </motion.p>
              </AnimatePresence>

              {expandedItem === event.id && (
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

export default EventCalendar;
