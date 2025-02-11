import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // Ensure MongoDB is connected

  if (req.method === "GET") {
    try {
      const users = await User.find(); // Fetch all users
      return res.status(200).json({ success: true, users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ success: false, error: (error as Error).message });
    }
  } 

  else if (req.method === "POST") {
    try {
      const { name, email, password, phone, wallet, referralCode, referredBy } = req.body;

      // Check for required fields
      if (!name || !email || !password || !phone) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      // Create a new user
      const newUser = await User.create({
        name,
        email,
        password,
        phone,
        wallet: wallet || 0, // Default wallet balance if not provided
        referralCode: referralCode || null,
        referredBy: referredBy || null
      });

      return res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(400).json({ success: false, error: (error as Error).message });
    }
  } 

  else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
