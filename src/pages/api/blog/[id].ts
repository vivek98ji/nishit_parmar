import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import blog from "@/models/blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const blogPost = await blog.findById(id);
      
      if (!blogPost) {
        return res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
      }

      return res.status(200).json({ success: true, data: blogPost });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}