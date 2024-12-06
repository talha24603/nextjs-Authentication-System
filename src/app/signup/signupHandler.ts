"use server";

import { sendVerificationEmail } from "@/email/sendVerificationEmail";
import { connectDb } from "@/lib/utils";
import { User } from "@/model/user";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export default async function signupHandler(formData:any) {
const name = formData.get('name') as string | undefined;
const email = formData.get('email') as string | undefined;
const password = formData.get('password') as string | undefined;

if (!name || !email || !password) throw new Error('Provide all fields');

// Establish database connection
console.log("Attempting database connection...");
await connectDb();
console.log("Database connected.");

// Check if user exists
const existingUser = await User.findOne({ email });
if (existingUser) throw new Error('Email already exists');

// Create new user
const hashedPassword = await hash(password, 10);
const otp = Math.floor(Math.random() * 900000 + 100000).toString()
const otpExpiry = new Date(Date.now() + 3600000)
const sendEmail = await sendVerificationEmail(email, otp)
if (sendEmail) {
    await User.create({
        name,
        email,
        password: hashedPassword,
        verifyCode: otp,
        verifyCodeExpiry: otpExpiry   

        
    });
    return { redirectUrl: `verify-code?email=${encodeURIComponent(email)}`}
}
console.log("User created successfully.");

      
    

;
}