"use client";
import * as React from "react";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { setTheme, theme } = useTheme();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const iconHover = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        scale: { duration: 0.2, type: "spring", stiffness: 400 },
        rotate: { duration: 0.5, ease: "easeInOut" },
      },
    },
  };

  const searchBarVariants = {
    rest: { width: "200px" },
    focus: { width: "250px", transition: { duration: 0.3 } },
  };

  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  // Toggle theme directly on click
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="flex items-center justify-between p-4 transition-colors dark:bg-gray-900 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* SEARCH BAR */}
      <motion.div
        initial="rest"
        animate={isSearchFocused ? "focus" : "rest"}
        variants={searchBarVariants}
        className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-indigo-300 dark:ring-indigo-700 px-2 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all"
      >
        <motion.div whileHover={{ rotate: 15 }}>
          <Image src="/search.png" alt="" width={14} height={14} />
        </motion.div>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 bg-transparent outline-none dark:placeholder-gray-500"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </motion.div>

      {/* ICONS AND USER */}
      <motion.div className="flex items-center gap-6 justify-end w-full">
        {/* Theme Toggle - Now with direct click */}
        <motion.div
          whileHover="hover"
          initial="rest"
          variants={iconHover}
          onClick={toggleTheme}
          className="cursor-pointer"
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-7 w-7 dark:bg-gray-800 dark:border-indigo-700 border-indigo-300 bg-white/90 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {theme !== "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex flex-col"
        >
          <motion.span
            whileHover={{ color: "#6366f1" }}
            className="text-xs leading-3 font-medium dark:text-gray-300"
          >
            John Doe
          </motion.span>
          <motion.span className="text-[10px] text-gray-500 dark:text-gray-400 text-right">
            Admin
          </motion.span>
        </motion.div>

        {/* User Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
          }}
          className="rounded-full overflow-hidden border-2 border-indigo-300 dark:border-indigo-600 shadow-md"
        >
          <Image
            src="/avatar.png"
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
