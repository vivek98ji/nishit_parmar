import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Review from "../../../models/review";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { productId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(productId as string)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    try {
        const reviews = await Review.find({ productId }).populate("userId", "name");
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}