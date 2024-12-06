import { clsx, type ClassValue } from "clsx"
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const connectDb=async ()=>{
  try {
    if(mongoose.connections && mongoose.connections[0].readyState) return;
  
    const {connection} = await mongoose.connect(process.env.MONGO_URI || '',{})
      console.log(`Connection to databse: ${connection.host}`);
  } catch (error) {
    throw new Error("error connecting to database")
  }
}