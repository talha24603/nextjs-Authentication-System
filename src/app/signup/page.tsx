"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User } from '@/model/user'
import { hash } from 'bcryptjs'
import { redirect, useRouter } from 'next/navigation'
import { connectDb } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import GoogleLoginButton from '@/components/googleLoginButton'
import SignInWithGoogle from './signupwithgoogle'
import { sendVerificationEmail } from '@/email/sendVerificationEmail'
import signupHandler from './signupHandler'

const page = () => {
    const router = useRouter()
    const signup = async (formData: FormData) => {
        const response = await signupHandler(formData)
        if (response) {
            router.push(response.redirectUrl)
        }
    }
    return (
        <div className='flex justify-center items-center h-dvh'>
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent >
                    <form
                        className="flex flex-col gap-4"
                        action={signup}
                    >
                        <Input placeholder="Name" name="name" />
                        <Input placeholder="Email" type="email" name="email" />
                        <Input placeholder="Password" type="password" name="password" />
                        <Button type="submit">Sign up</Button>
                    </form>

                </CardContent>
                <CardFooter className='flex flex-col gap-4'>
                    <form
                        action={SignInWithGoogle}
                    >
                        <Button type="submit" variant={"outline"} className="w-full">Continue with Google</Button>
                    </form>

                    <Link href='/login'>
                        if already registered? login
                    </Link>
                </CardFooter>
            </Card>

        </div>
    )
}

export default page
