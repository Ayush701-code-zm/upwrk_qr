import { supabase } from "../config/supabaseClient.js";
import bcrypt from "bcryptjs";

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Fetch user from database
    const { data, error } = await supabase
      .from("users")
      .select("id, email, password, name")
      .eq("email", email)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Login successful", user: data });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// User Registration
export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword, name }])
      .select(); // Explicitly select the inserted data

    if (error) {
      return res
        .status(400)
        .json({ message: "Signup failed", error: error.message });
    }

    if (!data || data.length === 0) {
      return res
        .status(500)
        .json({ message: "User creation failed, no data returned" });
    }

    return res.status(201).json({
      message: "User created successfully",
      user: data[0], // Now data[0] should exist safely
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// User Logout
export const logoutUser = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({
        message: "Logout failed",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "No user authenticated",
      });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
