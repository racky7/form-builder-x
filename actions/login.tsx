"use server";

import { z } from "zod";
import { loginConfig } from "@/lib/auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof loginConfig>) => {
  const validatedFields = loginConfig.parse(values);

  if (!validatedFields) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default: {
          error: "Something went wrong";
        }
      }
    }

    throw error;
  }
};
