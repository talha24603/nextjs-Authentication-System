import mongoose from 'mongoose';
  export interface User {
    name: string,
    email: string,
    password: string,
    googleId: string,
    isVerified: boolean,
    verifyCode: string,
    verifyCodeExpiry: string
  }
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    googleId: { type: String},
    isVerified: { type: Boolean,default:false},
    verifyCodeExpiry:{type:String},
    verifyCode:{type:String},
  });
  
  export const User = mongoose.models?.User || mongoose.model("User", userSchema);
  