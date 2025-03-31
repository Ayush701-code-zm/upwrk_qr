"use client";

import { role } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Home, Gift, User, Settings, LogOut } from "lucide-react";
import LogoutModal from "./LogoutModal";
import ProfileModal from "./ProfileModal"; // Import the ProfileModal component

const menuItems = [
  {
    title: "MENU",
    color: "#4F46E5",
    items: [
      {
        icon: <Home size={20} />,
        label: "Home",
        href: "/admin",
        color: "#818CF8",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Gift size={20} />,
        label: "Coupons",
        href: "coupons",
        color: "#6366F1",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    color: "#10B981",
    items: [
      {
        icon: <User size={20} />,
        label: "Profile",
        href: "#", // Changed from "/profile" to "#" to prevent navigation
        color: "#34D399",
        visible: ["admin", "teacher", "student", "parent"],
        isProfile: true, // Add a flag to identify this as the profile item
      },
      {
        icon: <LogOut size={20} />,
        label: "Logout",
        href: "#",
        color: "#F87171",
        visible: ["admin", "teacher", "student", "parent"],
        isLogout: true,
      },
    ],
  },
];

const Menu = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Add state for profile modal

  // Define animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Define animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  // Define animation variants for the title
  const titleVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  // Define animation variants for the section
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.div
        className="mt-4 text-sm p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((section) => (
          <motion.div
            className="flex flex-col gap-2 mb-6"
            key={section.title}
            variants={sectionVariants}
          >
            <motion.span
              className="hidden lg:block font-medium my-4 pl-2 border-l-4"
              style={{
                color: section.color,
                borderColor: section.color,
              }}
              variants={titleVariants}
            >
              {section.title}
            </motion.span>

            {section.items.map((item) => {
              if (item.visible.includes(role)) {
                return (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    onHoverStart={() => setActiveItem(item.label)}
                    onHoverEnd={() => setActiveItem(null)}
                  >
                    {item.isLogout ? (
                      <div
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="flex items-center justify-center lg:justify-start gap-4 py-2 md:px-4 rounded-md transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundColor:
                            activeItem === item.label
                              ? `${item.color}20`
                              : "transparent",
                          color:
                            activeItem === item.label ? item.color : "gray",
                        }}
                      >
                        <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                          {item.icon}
                        </motion.div>
                        <motion.span
                          className="hidden lg:block font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {item.label}
                        </motion.span>

                        <motion.div
                          className="ml-auto hidden lg:block h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: activeItem === item.label ? 1 : 0,
                            transition: { type: "spring" },
                          }}
                        />
                      </div>
                    ) : item.isProfile ? ( // Handle Profile item specifically
                      <div
                        onClick={() => setIsProfileModalOpen(true)} // Open profile modal on click
                        className="flex items-center justify-center lg:justify-start gap-4 py-2 md:px-4 rounded-md transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundColor:
                            activeItem === item.label
                              ? `${item.color}20`
                              : "transparent",
                          color:
                            activeItem === item.label ? item.color : "gray",
                        }}
                      >
                        <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                          {item.icon}
                        </motion.div>
                        <motion.span
                          className="hidden lg:block font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {item.label}
                        </motion.span>

                        <motion.div
                          className="ml-auto hidden lg:block h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: activeItem === item.label ? 1 : 0,
                            transition: { type: "spring" },
                          }}
                        />
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center justify-center lg:justify-start gap-4 py-2 md:px-4 rounded-md transition-all duration-300"
                        style={{
                          backgroundColor:
                            activeItem === item.label
                              ? `${item.color}20`
                              : "transparent",
                          color:
                            activeItem === item.label ? item.color : "gray",
                        }}
                      >
                        <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                          {item.icon}
                        </motion.div>
                        <motion.span
                          className="hidden lg:block font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {item.label}
                        </motion.span>

                        <motion.div
                          className="ml-auto hidden lg:block h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: activeItem === item.label ? 1 : 0,
                            transition: { type: "spring" },
                          }}
                        />
                      </Link>
                    )}
                  </motion.div>
                );
              }
              return null;
            })}
          </motion.div>
        ))}
      </motion.div>

      {/* Include both modals */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default Menu;
