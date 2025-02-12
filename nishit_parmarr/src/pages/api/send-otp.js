
import { Resend } from "resend";
console.log("🔑 RESEND_API_KEY:", process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
const otpStorage = {};

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method Not Allowed" });

    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStorage[email] = otp; // Store OTP for verification

    try {
        const response = await resend.emails.send({
            from: `"HelperBuddy" <onboarding@resend.dev>`,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`
        });

        console.log("OTP Sent:", response);
        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("Resend Error:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
}



