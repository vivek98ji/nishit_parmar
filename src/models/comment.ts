import mongoose, { Schema, Document } from "mongoose"

export interface IComment extends Document {
  user: string
  avatar: string
  rating: number
  comment: string
  date: string
  likes: number
}

const CommentSchema = new Schema<IComment>(
  {
    user: { type: String, required: true },
    avatar: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Use a more reliable way to check for existing models
let Comment: mongoose.Model<IComment>;
try {
  Comment = mongoose.model<IComment>("Comment")
} catch {
  Comment = mongoose.model<IComment>("Comment", CommentSchema)
}

export default Comment