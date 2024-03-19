import * as z from "zod"

export const storeSchema = z.object({
  name: z.string().min(1, { message: "Field is required" }),
  id: z.string().optional(),
})
