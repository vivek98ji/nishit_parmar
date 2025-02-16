// import { NextApiRequest, NextApiResponse } from "next";
// import mongoose from "mongoose";
// import Review from "../../../models/review"; // Ensure this is the correct path
// import dbConnect from "../../../lib/dbConnect"; // Import your DB connection utility

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     await dbConnect(); // Ensure DB connection

//     const { productId } = req.query;

//     if (!mongoose.Types.ObjectId.isValid(productId as string)) {
//         return res.status(400).json({ error: "Invalid product ID" });
//     }

//     try {
//         const reviews = await Review.find({ productId }).populate("userId", "name"); // Populate user name if needed
//         res.status(200).json(reviews);
//     } catch (error) {
//         console.error("Error fetching reviews:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }



import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Review from "../../../models/review"; // Ensure this is the correct path
import dbConnect from "../../../lib/dbConnect"; // Import your DB connection utility

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect(); // Ensure DB connection

    const { productId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(productId as string)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    try {
        console.log(`Fetching reviews for productId: ${productId}`); // Log the productId
        const reviews = await Review.find({ productId }).populate("userId", "name"); // Populate user name if needed
        console.log(`Reviews found: ${reviews.length}`); // Log the number of reviews found
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}