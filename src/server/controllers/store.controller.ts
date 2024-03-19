import { createInsertSchema } from "drizzle-zod"
import { ecomCmsStores } from "drizzle/schema"
import * as z from "zod"
import { db } from "../db"

export const insertStoreSchema = createInsertSchema(ecomCmsStores)

export const createNewStore = async (
  values: z.infer<typeof insertStoreSchema>,
  userId: string
) => {
  const storeData = await db
    .insert(ecomCmsStores)
    .values({ ...values, userId })
    .returning()
  return storeData[0]
}
