import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://ashketchup:hNOHeUGfiql0Zb8v@cluster0.w0z87.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'; // Ensure you have this in `.env.local`

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default dbConnect;
