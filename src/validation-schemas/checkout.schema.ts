import { z } from "zod"

export const checkoutSchema = z.object({
  phone: z.string().min(1).trim().nullish(),
  address: z.string().min(1).trim(),
  buyerEmail: z
    .string()
    .trim()
    .min(1, { message: "Email field is required" })
    .email({ message: "Field must be a valid email" })
    .max(50),
})
