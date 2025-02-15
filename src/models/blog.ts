import mongoose from "mongoose"

const blogPost = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  excerpt: { type: String, required: true },
  image: { type: String, required: true },
});


export default mongoose.models.blogs || mongoose.model("blogs", blogPost)
