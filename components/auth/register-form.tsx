"use client";

import { z } from "zod";
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
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";

const signupConfig = z.object({
  name: z.string().trim().min(1, { message: "Fullname is required" }),
  email: z.string().email(),
  password: z.string().min(4, { message: "Password is required" }),
});

export default function RegisterForm() {
  const router = useRouter();
  const signUpUserMutation = trpc.user.signUpUser.useMutation({
    onSuccess: () => {
      // toast.success("Sign Up Sucessfully");
      router.push("/log-in");
    },
    onError: (error) => {
      // toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof signupConfig>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signupConfig),
  });

  const onSubmit = (values: z.infer<typeof signupConfig>) => {
    signUpUserMutation.mutate(values);
  };

  return (
    <CardWrapper
      headerLabel="Create a new account"
      backbuttonhref="/auth/login"
      backbuttonlabel="Already have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={signUpUserMutation.isLoading}
                    placeholder="Your name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={signUpUserMutation.isLoading}
                    placeholder="your.email@gmail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    disabled={signUpUserMutation.isLoading}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={signUpUserMutation.isLoading}
            type="submit"
            className="w-full"
          >
            Create an Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
