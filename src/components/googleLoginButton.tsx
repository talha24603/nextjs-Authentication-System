// components/GoogleLoginButton.tsx
"use client"; // Ensure this component is a Client Component

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const GoogleLoginButton = () => {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => signIn("google")}
    >
      Login with Google
    </Button>
  );
};

export default GoogleLoginButton;
