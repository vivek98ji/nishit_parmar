import mongoose from 'mongoose';

//const MONGODB_URI = 'mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority';
const MONGODB_URI='mongodb+srv://ashketchup:hNOHeUGfiql0Zb8v@cluster0.w0z87.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env file");
}

// Use global caching to prevent multiple connections
let cached = (global as any).mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {}); // Removed deprecated options
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}

export default connectDB;
