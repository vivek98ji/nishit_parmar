import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import blog from "@/models/blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const blogs = await blog.find().sort({ date: -1 });
        return res.status(200).json({ success: true, data: blogs });
      } catch (error) {
        return res.status(500).json({ 
          success: false, 
          message: error instanceof Error ? error.message : String(error) 
        });
      }

    case "POST":
      try {
        const { title, excerpt, content, image } = req.body;
        
        // Validate required fields
        if (!title || !excerpt || !content || !image) {
          return res.status(400).json({ 
            success: false, 
            message: "All fields are required" 
          });
        }

        const newBlog = await blog.create({
          title,
          excerpt,
          content,
          image,
          date: new Date(),
          author: 'Admin' // You can modify this based on logged-in user
        });

        return res.status(201).json({ success: true, data: newBlog });
      } catch (error) {
        return res.status(500).json({ 
          success: false, 
          message: error instanceof Error ? error.message : String(error) 
        });
      }

    case "DELETE":
      try {
        const { id } = req.body;
        const deletedBlog = await blog.findByIdAndDelete(id);
        
        if (!deletedBlog) {
          return res.status(404).json({ success: false, message: "Blog not found" });
        }
        
        return res.status(200).json({ success: true, data: deletedBlog });
      } catch (error) {
        return res.status(500).json({ 
          success: false, 
          message: error instanceof Error ? error.message : String(error) 
        });
      }

    default:
      return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}