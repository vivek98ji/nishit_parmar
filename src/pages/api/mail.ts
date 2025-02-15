import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import mail from "@/models/mail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const mails = await mail.find().sort({ date: -1 }); // Sort by date descending
        return res.status(200).json({ success: true, mails });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ 
          success: false, 
          error: error instanceof Error ? error.message : String(error) 
        });
      }

    case "POST":
      try {
        const mailData = req.body;
        
        // If it's an admin sending the mail, set isStarred and isAdminSent to true
        if (mailData.sender === "admin@example.com") { // Replace with your admin email logic
          mailData.isStarred = true;
          mailData.isAdminSent = true;
          mailData.type = 'sent';
        }

        const newMail = await mail.create(mailData);
        return res.status(201).json({ success: true, mail: newMail });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ 
          success: false, 
          error: error instanceof Error ? error.message : String(error) 
        });
      }

    default:
      return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}