// SignInWithGoogle.tsx
"use server"

import { signIn } from "@/auth";

export default async function SignInWithGoogle() {
  await signIn("google");
}
