"use client";

import { z } from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";

const loginConfig = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: "Password is required" }),
});

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = trpc.user.logInUser.useMutation({
    onSuccess: (user) => {
      console.log(user);
      // toast.success("Login successful");
      router.push("/forms");
    },
    onError: (error) => {
      // toast.error("Login failed");
    },
  });

  const form = useForm<z.infer<typeof loginConfig>>({
    defaultValues: {
      email: "test.account@gmail.com",
      password: "Abc123",
    },
    resolver: zodResolver(loginConfig),
  });

  const onSubmit = (values: z.infer<typeof loginConfig>) => {
    loginMutation.mutate(values);
  };

  return (
    <CardWrapper
      headerLabel="Sign in to your account"
      backbuttonhref="/auth/register"
      backbuttonlabel="Don't have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loginMutation.isLoading}
                    placeholder="your.email@gmail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="*******"
                    disabled={loginMutation.isLoading}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            disabled={loginMutation.isLoading}
            type="submit"
            className="w-full"
          >
            Log in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
