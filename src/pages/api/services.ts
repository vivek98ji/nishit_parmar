import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const services = await Service.find(); // Fetch all services
      res.status(200).json({ success: true, services });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ success: false, error: errorMessage });
    }
  } else if (req.method === "POST") {
    try {
      const service = await Service.create(req.body); // Add new service
      res.status(201).json({ success: true, service });
    } catch (error) {
      res.status(400).json({ success: false, error: (error as any).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
