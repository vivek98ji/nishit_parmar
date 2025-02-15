import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import Provider from "@/models/provider";
import { hash } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { name, categories, owner_name, contact, location, bank_info, user_info } = req.body;

    // ✅ Validate only required fields
    if (!name || !categories || !Array.isArray(categories) || categories.length === 0 || !contact?.phone || !contact?.email || !user_info?.email || !user_info?.password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Check if provider already exists
    const existingProvider = await Provider.findOne({
      $or: [
        { "contact.email": contact.email },
        { "user_info.email": user_info.email }
      ]
    });

    if (existingProvider) {
      return res.status(400).json({
        success: false,
        message: "A provider with this email already exists"
      });
    }

    // Hash the password
    const hashedPassword = await hash(user_info.password, 10);

    console.log("Received Request Body:", req.body);

    // Create new provider
    const provider = new Provider({
      name,
      categories, // Updated to handle array of strings
      owner_name: owner_name || "",  // Allow empty optional fields
      contact,
      location: location || {},
      bank_info: {
        ...bank_info,
        code_number: bank_info.code_number || "", // Provide default empty string if not present
        identifier_code: bank_info.identifier_code || "" // Provide default empty string if not present
      },
      user_info: {
        ...user_info,
        username: name, // Set username to the same value as name
        password: hashedPassword // Use hashed password
      }
    });

    await provider.save();

    return res.status(201).json({
      success: true,
      message: "Provider account created successfully",
      provider
    });

  } catch (error) {
    console.error("Error in provider signup:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}