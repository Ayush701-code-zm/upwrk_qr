"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Edit,
  Camera,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LogoutModal from "./LogoutModal";

const ProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
  });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [hasProfileImage, setHasProfileImage] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  // Fetch user data on component mount
  useEffect(() => {
    if (!isOpen) return;

    const fetchCurrentUser = async () => {
      try {
        // Check for user in localStorage first
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser({
            ...userData,
            // Adding some default values for fields that might not be in localStorage
            joinDate: userData.joinDate || "January 2023",
            bio: userData.bio || "No bio available",
            location: userData.location || "Not specified",
          });
          setEditForm({
            name: userData.name || "",
            email: userData.email || "",
            bio: userData.bio || "No bio available",
            location: userData.location || "Not specified",
          });

          // Check if user has a profile image
          setHasProfileImage(userData.profileImage ? true : false);

          setLoading(false);
          return;
        }

        // If no stored user, try to fetch from API
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
        const userData = {
          ...data.user,
          joinDate: data.user.joinDate || "January 2023",
          bio: data.user.bio || "No bio available",
          location: data.user.location || "Not specified",
        };

        setUser(userData);
        setEditForm({
          name: userData.name || "",
          email: userData.email || "",
          bio: userData.bio || "No bio available",
          location: userData.location || "Not specified",
        });

        // Check if user has a profile image
        setHasProfileImage(userData.profileImage ? true : false);

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // Handle error - could show error message in modal instead of redirect
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [isOpen]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      const updatedUser = {
        ...user,
        ...editForm,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Here you would typically send the updated data to your API
      // Example:
      // updateUserProfile(editForm);

      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={modalVariants}
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg"
      >
        {/* Modal Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <div className="animate-pulse space-y-4 flex flex-col items-center">
              <div className="h-24 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="w-full"
            >
              {/* Profile Header Card */}
              <Card className="mb-6 overflow-hidden border-indigo-200 dark:border-indigo-800">
                <div className="h-32 bg-gradient-to-r from-indigo-400 to-purple-500 dark:from-indigo-600 dark:to-purple-800"></div>
                <CardContent className="relative pt-0">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-end -mt-16 md:-mt-12 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <div className="rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden h-32 w-32 bg-white dark:bg-gray-700 flex items-center justify-center">
                        {hasProfileImage ? (
                          <Image
                            src="/avatar.png"
                            alt={user.name}
                            width={128}
                            height={128}
                            className="object-cover"
                          />
                        ) : (
                          <User className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                        )}
                        {isEditing && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer">
                            <Camera className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>

                    <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-between w-full">
                      <div className="text-center md:text-left mb-4 md:mb-0">
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                            className="text-2xl font-bold mb-1 bg-transparent border-b border-indigo-300 dark:border-indigo-600 focus:outline-none focus:border-indigo-500 dark:text-white"
                          />
                        ) : (
                          <h2 className="text-2xl font-bold mb-1 dark:text-white">
                            {user.name}
                          </h2>
                        )}
                        <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center md:justify-start gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {user.joinDate}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleEditToggle}
                          variant="outline"
                          className="gap-2 border-indigo-300 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                        >
                          {isEditing ? (
                            <Save className="h-4 w-4" />
                          ) : (
                            <Edit className="h-4 w-4" />
                          )}
                          {isEditing ? "Save" : "Edit Profile"}
                        </Button>

                        <Button
                          onClick={openLogoutModal}
                          variant="outline"
                          className="gap-2 border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900 text-red-500"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                {/* User Info Card */}
                <motion.div
                  variants={staggerChildren}
                  initial="hidden"
                  animate="visible"
                  className="md:col-span-2"
                >
                  <Card className="border-indigo-200 dark:border-indigo-800">
                    <CardHeader>
                      <CardTitle className="text-indigo-600 dark:text-indigo-400">
                        About Me
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div variants={itemVariant} className="space-y-4">
                        <div className="flex gap-3 items-start">
                          <User className="w-5 h-5 mt-0.5 text-indigo-500" />
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Full Name
                            </h3>
                            {isEditing ? (
                              <input
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-b border-indigo-200 dark:border-indigo-700 focus:outline-none focus:border-indigo-500 dark:text-white"
                              />
                            ) : (
                              <p className="dark:text-white">{user.name}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <Mail className="w-5 h-5 mt-0.5 text-indigo-500" />
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Email
                            </h3>
                            {isEditing ? (
                              <input
                                type="email"
                                name="email"
                                value={editForm.email}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-b border-indigo-200 dark:border-indigo-700 focus:outline-none focus:border-indigo-500 dark:text-white"
                              />
                            ) : (
                              <p className="dark:text-white">{user.email}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <MapPin className="w-5 h-5 mt-0.5 text-indigo-500" />
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Location
                            </h3>
                            {isEditing ? (
                              <input
                                type="text"
                                name="location"
                                value={editForm.location}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-b border-indigo-200 dark:border-indigo-700 focus:outline-none focus:border-indigo-500 dark:text-white"
                              />
                            ) : (
                              <p className="dark:text-white">{user.location}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariant}>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Bio
                        </h3>
                        {isEditing ? (
                          <textarea
                            name="bio"
                            value={editForm.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full bg-gray-50 dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                          />
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300">
                            {user.bio}
                          </p>
                        )}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Account Activities */}
                <motion.div variants={fadeIn} className="space-y-6">
                  <Card className="border-indigo-200 dark:border-indigo-800">
                    <CardHeader>
                      <CardTitle className="text-indigo-600 dark:text-indigo-400">
                        Account
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Account Status
                        </span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                          Active
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Last Login
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Today
                        </span>
                      </div>

                      <div className="pt-4">
                        <Button
                          variant="outline"
                          className="w-full border-indigo-300 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                        >
                          Account Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-200 dark:border-indigo-800">
                    <CardHeader>
                      <CardTitle className="text-indigo-600 dark:text-indigo-400">
                        Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Email Notifications
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"></div>
                        </label>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Two-Factor Auth
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"></div>
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Logout Modal */}
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        />
      </motion.div>
    </div>
  );
};

export default ProfileModal;
