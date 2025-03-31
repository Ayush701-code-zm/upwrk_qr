// frontend/src/components/AuthProvider.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  // Public paths that don't require authentication
  const publicPaths = ["/sign-in", "/sign-up", "/forgot-password"];

  useEffect(() => {
    // Check if we have a user in localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else if (!publicPaths.includes(pathname)) {
      // If no user/token and not on a public path, redirect to sign-in
      router.push("/sign-in");
    }

    setLoading(false);
  }, [pathname, router]);

  // Login function
  const login = (userData, authToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
    router.push("/admin");
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    router.push("/sign-in");
  };

  // Check if route is protected
  useEffect(() => {
    if (!loading && !user && !publicPaths.includes(pathname)) {
      router.push("/sign-in");
    }
  }, [user, pathname, loading, router]);

  const value = {
    user,
    token,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
