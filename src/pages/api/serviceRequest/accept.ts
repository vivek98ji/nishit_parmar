// pages/api/serviceRequest/accept.ts
import connectDB from "@/lib/mongodb";
import ServiceRequest from "@/models/ServiceRequest";
import Service from "@/models/Service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { id } = req.body;
      
      // Find and validate the service request
      const request = await ServiceRequest.findById(id);
      if (!request) return res.status(404).json({ success: false, error: "Request not found" });

      // Create new service
      const newService = await Service.create({
        name: request.name,
        description: request.description,
        price: request.price,
        category: request.category,
        available: request.available,
        providerId: request.providerId
      });

      // Remove the original request
      await ServiceRequest.findByIdAndDelete(id);

      res.status(200).json({ success: true, service: newService });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}