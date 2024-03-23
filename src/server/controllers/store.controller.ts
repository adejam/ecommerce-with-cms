import { createInsertSchema } from "drizzle-zod"
import { ecomCmsStores } from "drizzle/schema"
import type * as z from "zod"
import { db } from "../db"
import { and, eq } from "drizzle-orm"
import { currentDate } from "@/lib/utils"

export const insertStoreSchema = createInsertSchema(ecomCmsStores)

export const createNewStore = async (
  values: z.infer<typeof insertStoreSchema>,
  userId: string
) => {
  const storeData = await db
    .insert(ecomCmsStores)
    .values({ ...values, userId, updatedAt: currentDate() })
    .returning()
  return storeData[0]
}

export const updateStore = async (
  values: z.infer<typeof insertStoreSchema>,
  id: string,
  userId: string
) => {
  if (id !== values.id) throw new Error("Bad request!")

  await db
    .update(ecomCmsStores)
    .set({ ...values, updatedAt: currentDate() })
    .where(and(eq(ecomCmsStores.userId, userId), eq(ecomCmsStores.id, id)))
}

export const fetchStoreById = async (storeId: string) => {
  if (!storeId) throw new Error("Bad request.")
  const storeData = await db
    .select({
      id: ecomCmsStores.id,
      name: ecomCmsStores.name,
      userId: ecomCmsStores.userId,
    })
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

export const deleteStore = async (storeId: string, userId: string) => {
  await db
    .delete(ecomCmsStores)
    .where(and(eq(ecomCmsStores.userId, userId), eq(ecomCmsStores.id, storeId)))
}
