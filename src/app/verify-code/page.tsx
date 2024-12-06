"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { verifyCodeHandler } from "./verifyCodeHandler";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromUrl = searchParams.get("email");

    const form = useForm({
        defaultValues: {
            email: emailFromUrl || "",
            verifyCode: "",
        },
    });

    async function onSubmit(values: any) {
        console.log(values);
        const response = await verifyCodeHandler(values);
        if (response) {
            router.push("/");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Email Verification</h1>
                <p className="mt-2 text-sm text-center text-gray-600">
                    Enter the 6-digit verification code sent to your email.
                </p>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-6 flex flex-col space-y-4"
                    >
                        {/* Verification Code Input */}
                        <FormField
                            control={form.control}
                            name="verifyCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Verification Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your 6-digit code"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Hidden Email Input */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => <input type="hidden" {...field} />}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Page;
