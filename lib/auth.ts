import { z } from "zod";

export const loginConfig = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export const registerConfig = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email(),
    password: z.string().min(3, {
        message: "Minimum 3 characters required"
    })
})