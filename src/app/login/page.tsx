'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const signInHandler = async (e:any) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
  
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
  
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  
    console.log("Sign-in response:", response);
  
    if (response?.error) {
      alert(response.error);
    } else {
      router.push("/");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to log in</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={signInHandler}
            className="flex flex-col gap-4"
          >
            <Input placeholder="Email" type="email" name="email" required />
            <Input placeholder="Password" type="password" name="password" required />
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>or</span>
          <Button
            variant="outline"
            type="button"
            onClick={async () => {
              const response = await signIn('google', { callbackUrl: '/' }); // Specify the redirect URL
              if (response?.url) {
                router.push(response.url); // Ensure redirection after successful login
              }
            }}
          >
            Login with Google
          </Button>
          <Link href="/signup" className="text-blue-500 underline">
            If you don't have an account? Sign up now
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
