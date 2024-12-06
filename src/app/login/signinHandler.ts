'use server';

import { auth } from "@/auth";
import { signIn } from "next-auth/react";

export default async function loginHandler(formData: FormData) {
  const email = formData.get('email') as string | undefined;
  const password = formData.get('password') as string | undefined;

  if (!email || !password) {
    return { error: 'Please provide all fields' };
  }

  try {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      return { error: response.error };
    }

    const session = await auth();
    if (session?.user) {
      return { redirect: '/' };
    }

    return { error: 'Unexpected error occurred. Please try again.' };
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
