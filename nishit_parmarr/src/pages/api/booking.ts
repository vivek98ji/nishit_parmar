import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();
    const bookings = await Booking.find()
      .populate("userId")
      .populate("serviceId");
    
    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}