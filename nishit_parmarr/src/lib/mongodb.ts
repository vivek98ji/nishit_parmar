// lib/mongodb.ts
import mongoose from "mongoose"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return mongoose.connections[0]
    }
    
    await mongoose.connect(uri)
    return mongoose.connections[0]
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

export default connectDB