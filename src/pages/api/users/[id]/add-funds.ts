import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  await connectDB();
  
  try {
    const userId = req.query.id as string;
    console.log(`Attempting to find user with ID: ${userId}`);

    // Try direct string match first
    let user = await User.findOne({ _id: userId });
    
    if (!user && mongoose.isValidObjectId(userId)) {
      // If not found, try with ObjectId
      user = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) });
    }

    if (!user) {
      console.log("User not found in database");
      return res.status(404).json({ 
        success: false, 
        error: "User not found" 
      });
    }

    console.log("User found:", user);
    const { amount } = req.body;

    // Update user's wallet balance
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $inc: { wallet: Number(amount) } },
      { new: true }
    );

    // Create transaction record
    await Transaction.create({
      userId: user._id,
      type: 'credit',
      amount: Number(amount),
      description: 'Admin added funds',
      date: new Date()
    });

    res.status(200).json({ 
      success: true, 
      user: updatedUser 
    });

  } catch (error) {
    console.error("Error in add-funds:", error);
    res.status(400).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'An error occurred' 
    });
  }
}