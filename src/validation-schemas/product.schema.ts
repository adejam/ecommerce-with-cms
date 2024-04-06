import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1),
  images: z
    .object({ url: z.string(), id: z.string(), productId: z.string() })
    .array(),
  price: z.coerce.number().min(0),
  availableQuantity: z.coerce.number().min(0),
  categoryId: z.string().min(0).nullish(),
  colorId: z.string().min(0).nullish(),
  sizeId: z.string().min(0).nullish(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})
