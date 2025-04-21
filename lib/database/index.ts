import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure .env is loaded before anything else

console.log("MONGODB_URI from env:", process.env.MONGODB_URI); // Debugging log

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: "evently",
    bufferCommands: false,
  });

  cached.conn = await cached.promise;

  return cached.conn;
};
