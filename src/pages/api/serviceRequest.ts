import connectDB from "@/lib/mongodb";
import Service from "@/models/ServiceRequest";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const services = await Service.find();
      res.status(200).json({ success: true, services });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ success: false, error: errorMessage });
    }
  } else if (req.method === "POST") {
    try {
      // Validate required fields
      const { name, description, price, category } = req.body;
      
      if (!name || !description || !category || !price) {
        return res.status(400).json({ 
          success: false, 
          error: "Missing required fields" 
        });
      }

      // Add a temporary providerId for testing
      // In production, this should come from your authentication system
      const serviceData = {
        ...req.body,
        providerId: "65f1234567890123456789ab" // Temporary MongoDB ObjectId
      };

      const service = await Service.create(serviceData);
      res.status(201).json({ success: true, service });
    } catch (error) {
      // Improved error handling
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(400).json({ 
        success: false, 
        error: errorMessage
      });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}