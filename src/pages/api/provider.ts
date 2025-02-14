import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import Provider from "@/models/provider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { user_id } = req.query;
    if (!user_id || typeof user_id !== "string") {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const provider = await Provider.findOne({ "user_info.user_id": user_id });

    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider not found" });
    }

    return res.status(200).json({ success: true, provider });
  } catch (error) {
    console.error("Error fetching provider:", error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}
