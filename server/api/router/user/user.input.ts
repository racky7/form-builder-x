import { z } from "zod";
import { objectId } from "@/lib/validation";

export const getUserInput = z.object({
  id: objectId,
});

export const signUpUserInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const logInUserInput = z.object({
  email: z.string().email(),
  password: z.string(),
});
