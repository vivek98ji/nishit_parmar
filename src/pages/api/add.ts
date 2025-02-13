import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();
        
        // Log the incoming request body for debugging
        console.log('Received request body:', req.body);

        // Create new service
        const newService = await Service.create({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            
        });

        return res.status(201).json({
            success: true,
            service: newService
        });

    } catch (error) {
        console.error('Error in add service API:', error);
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Failed to add service'
        });
    }
}