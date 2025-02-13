import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import income from "@/models/income"; // Correct import

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();
    const incomes = await income.find(); // Use the correct model

    return res.status(200).json({ success: true, incomes }); // Return "mails" instead of "bookings"
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}