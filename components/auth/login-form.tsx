"use client";

import { z } from "zod";
import { useTransition } from "react";
import { loginConfig } from "@/lib/auth";
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
import { login } from "@/actions/login";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginConfig>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginConfig),
  });

  const onSubmit = (values: z.infer<typeof loginConfig>) => {
    startTransition(() => {
      login(values).then((data) => {
        console.log(data);
      });
    });
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
                    disabled={isPending}
                    placeholder="raj.chauhan@example.com"
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
                    disabled={isPending}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button disabled={isPending} type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
