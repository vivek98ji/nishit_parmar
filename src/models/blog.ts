import mongoose from "mongoose"

const blogPost = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true, default: 'Admin' }
});

export default mongoose.models.blogs || mongoose.model("blogs", blogPost)
