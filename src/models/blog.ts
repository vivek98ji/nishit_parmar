import mongoose from "mongoose"

const blogPost = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, default: 'Admin' }
});

export default mongoose.models.blogs || mongoose.model("blogs", blogPost)
