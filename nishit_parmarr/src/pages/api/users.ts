import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const users = await User.find(); // Fetch all users
      res.status(200).json({ success: true, users });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else if (req.method === "POST") {
    try {
      const user = await User.create(req.body); // Add new user
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
