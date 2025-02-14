import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const otpStore: Record<string, string> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { email, otp, action } = req.body;

    if (action === "send") {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = generatedOtp;

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Your OTP Code",
            html: `<div style='font-family: Arial, sans-serif; text-align: center;'>
                      <h2 style='color: #4CAF50;'>Your OTP Code</h2>
                      <p style='font-size: 18px;'>Use the following OTP to sign in:</p>
                      <h3 style='font-size: 24px; color: #333;'>${generatedOtp}</h3>
                      <p>This OTP is valid for a short time.</p>
                   </div>`
        });

        return res.status(200).json({ success: true });
    }

    if (action === "verify") {
        if (!otpStore[email] || otpStore[email] !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Welcome to HelperBuddy!",
            html: `<div style='font-family: Arial, sans-serif; text-align: center;'>
                      <h1 style='color: #4CAF50;'>Welcome to HelperBuddy!</h1>
                      <p>We are excited to have you onboard. Explore our services now!</p>
                      <a href='https://yourwebsite.com/home' style='display: inline-block; padding: 10px 20px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;'>Go to Homepage</a>
                   </div>`
        });

        delete otpStore[email];
        return res.status(200).json({ success: true });
    }

    res.status(400).json({ error: "Invalid action" });
}