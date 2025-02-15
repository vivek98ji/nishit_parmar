import { NextApiRequest, NextApiResponse } from "next";
import Provider from "@/models/provider";
import { compare } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;
    
    // Find provider by email
    const provider = await Provider.findOne({ "contact.email": email });
    if (!provider) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Verify password
    const isValid = await compare(password, provider.user_info.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Return provider ID
    return res.status(200).json({
      success: true,
      providerId: provider.user_info.user_id
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Login failed"
    });
  }
}