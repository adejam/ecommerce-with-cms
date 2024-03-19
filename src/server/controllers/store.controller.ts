import { createInsertSchema } from "drizzle-zod"
import { ecomCmsStores } from "drizzle/schema"
import * as z from "zod"
import { db } from "../db"
import { eq } from "drizzle-orm"

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

export const fetchStoreById = async (storeId: string) => {
  if (!storeId) throw new Error("Bad request.")
  const storeData = await db
    .select({ id: ecomCmsStores.id })
    .from(ecomCmsStores)
    .where(eq(ecomCmsStores.id, storeId))

  return storeData[0]
}

export const fetchAllUserStores = async (userId: string) => {
  if (!userId) throw new Error("Bad request.")
  return await db
    .select({ id: ecomCmsStores.id, name: ecomCmsStores.name })
    .from(ecomCmsStores)
    .where(eq(ecomCmsStores.userId, userId))
}
