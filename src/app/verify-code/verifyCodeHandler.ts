"use server"

import { connectDb } from "@/lib/utils";
import { User } from "@/model/user";

export async function verifyCodeHandler(values: any) {
    try {
        const email = values.email;
        const verifyCode = values.verifyCode;
        if (!verifyCode) {
            throw new Error('Please enter your 6 digit verification code')
        }
        await connectDb
        const user = await User.findOne({ email })
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date()
        const isCodeValid=user.verifyCode===verifyCode
        if (!isCodeValid || !isCodeNotExpired) {
            throw new Error('Invalid verification code')
        }
        if(isCodeNotExpired){
            if (isCodeValid) {
                
                user.isVerified=true
            }
        }
        await user.save()
        return true
} catch (error) {
    throw new Error("Error while verifying code"+error)
    }

}