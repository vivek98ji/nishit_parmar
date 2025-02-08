import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const bookings = await Booking.find().populate("userId serviceId"); // Fetch all bookings with user & service details
      res.status(200).json({ success: true, bookings });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else if (req.method === "POST") {
    try {
      const booking = await Booking.create(req.body); // Add new booking
      res.status(201).json({ success: true, booking });
    } catch (error) {
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
