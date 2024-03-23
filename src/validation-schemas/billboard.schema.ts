import { z } from "zod"

export const billBoardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().nullish(),
})
