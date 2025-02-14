import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { amount, currency } = req.body;

        try {
            const options = {
                amount: amount * 100, // Convert to smallest currency unit (paise)
                currency,
                payment_capture: 1, // Auto capture payment
            };

            const order = await razorpay.orders.create(options);
            res.status(200).json(order);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
