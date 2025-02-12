import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const otpStorage = {}; // Ensure it's globally accessible

export default async function handler(req, res) {
    console.log("Stored OTP:", otpStorage[email]);
    console.log("Received OTP:", otp);

    if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method Not Allowed" });

    const { email, otp } = req.body;
    console.log(otpStorage);
    console.log(otp)
    if (otpStorage[email] === otp) return res.status(400).json({ success: false, message: "Email and OTP are required" });

    if (otpStorage[email] === otp) {

        delete otpStorage[email]; // OTP is valid, remove it from storage

        try {
            const response = await resend.emails.send({
                from: `"HelperBuddy" <onboarding@resend.dev>`,
                to: email,
                subject: "Welcome to Our Platform",
                text: "Thank you for signing up!"
            });

            console.log("Welcome Email Sent:", response);
            res.json({ success: true, message: "OTP verified! Welcome email sent." });
        } catch (error) {
            console.error("Resend Error:", error);
            res.status(500).json({ success: false, message: "Failed to send welcome email" });
        }
    } else {
        res.status(400).json({ success: false, message: "Invalid OTP" });
    }
}




