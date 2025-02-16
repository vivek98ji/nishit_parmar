import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextApiRequest, NextApiResponse } from "next";
import Provider from "@/models/provider";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    await connectDB();
    try {
      const { providerId } = req.query;
  
      if (!providerId) {
        return res.status(400).json({ 
          success: false, 
          message: "Provider ID required" 
        });
      }
  
      // Validate provider exists
      const provider = await Provider.findOne({ "user_info.user_id": providerId });
      if (!provider) {
        return res.status(404).json({ 
          success: false, 
          message: "Provider not found" 
        });
      }
  
      // Get provider-specific services
      const services = await Service.find({ providerId });
      
      return res.status(200).json({ 
        success: true, 
        services 
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Server error"
      });
    }
  }