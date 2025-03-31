import { supabase } from "../config/supabaseClient.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Ensure user email exists
    if (!data.user.email) {
      return res.status(401).json({ message: "User email is missing" });
    }

    // Attach user to request
    req.user = {
      id: data.user.id,
      email: data.user.email,
      user_metadata: data.user.user_metadata,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default authMiddleware;
