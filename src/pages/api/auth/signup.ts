import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid'; // Add this import at the top

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { name, email, phone, password } = req.body;

    // Validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User with this email already exists" 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique ID for the user
    const userId = uuidv4();

    // Create new user with the generated ID
    const user = await User.create({
      _id: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      wallet: 0,
      referralCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Remove password from response
    const userResponse = {
      ...user.toObject(),
      password: undefined
    };

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userResponse
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: (error as Error).message
    });
  }
}