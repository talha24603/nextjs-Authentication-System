"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

function SignOutPage() {
    const router = useRouter();

    const handleSignOut = async () => {
      await signOut({ callbackUrl: "/login" }); // Ensure signOut redirects to "/login"
  };
  

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-800">Sign Out</h1>
                <p className="mt-2 text-gray-600">
                    Are you sure you want to sign out from your account?
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                    <Button
                        onClick={handleSignOut}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                        Sign Out
                    </Button>
                    
                </div>
            </div>
        </div>
    );
}

export default SignOutPage;
