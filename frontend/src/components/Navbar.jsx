"use client";
import * as React from "react";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const router = useRouter();

  const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const iconHover = {
    rest: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        scale: { duration: 0.2, type: "spring", stiffness: 400 },
      },
    },
  };

  const searchBarVariants = {
    rest: { width: "200px" },
    focus: { width: "250px", transition: { duration: 0.3 } },
  };

  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const data = await response.json();
        setUser(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [router]);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
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
          {/* Logout Button */}
          {user && (
            <motion.div
              whileHover="hover"
              initial="rest"
              variants={iconHover}
              onClick={openLogoutModal}
              className="cursor-pointer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-7 w-7 dark:bg-gray-800 dark:border-indigo-700 border-indigo-300 bg-white/90 shadow-sm"
              >
                <LogOut className="h-[1.2rem] w-[1.2rem] text-red-400" />
                <span className="sr-only">Logout</span>
              </Button>
            </motion.div>
          )}

          {/* User Info - Fixed, not blinking */}
          {loading ? (
            <div className="flex flex-col w-16">
              <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
              <div className="h-2 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ) : user ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex flex-col"
            >
              <span className="text-xs leading-3 font-medium dark:text-gray-300">
                {user.name}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 text-right">
                {user.email}
              </span>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => router.push("/sign-in")}
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-xs px-2 py-1 h-auto dark:text-indigo-400 text-indigo-600"
              >
                Sign In
              </Button>
            </motion.div>
          )}

          {/* User Avatar - Always showing User icon */}
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
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center w-9 h-9">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
