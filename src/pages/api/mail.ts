import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import Mail from "@/models/mail";
import Provider from "@/models/provider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { providerId } = req.query;

      // Validate provider exists
      const provider = await Provider.findOne({ 
        "user_info.user_id": providerId 
      });
      
      if (!provider) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid provider" 
        });
      }

      // Get provider-specific emails
      const mails = await Mail.find({ providerId });
      return res.status(200).json({ 
        success: true, 
        mails 
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Server error"
      });
    }
  }

  return res.status(405).json({ 
    success: false, 
    message: "Method not allowed" 
  });
}