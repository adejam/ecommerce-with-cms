import { ecomCmsSizes } from "../../../drizzle/schema"
import { db } from "../db"
import { and, eq } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { fetchStoreById } from "./store.controller"
import { currentDate } from "@/lib/utils"

export const fetchSizes = async (storeId: string) => {
  if (!storeId) throw new Error("Bad request.")
  return await db
    .select()
    .from(ecomCmsSizes)
    .where(eq(ecomCmsSizes.storeId, storeId))
}

export const fetchSize = async (storeId: string, sizeId: string) => {
  if (!storeId || !sizeId) throw new Error("Bad request.")
  return await db.query.ecomCmsSizes.findFirst({
    where: (ecomCmsSizes, { eq }) =>
      and(eq(ecomCmsSizes.storeId, storeId), eq(ecomCmsSizes.id, sizeId)),
  })
}

export const insertSizeSchema = createInsertSchema(ecomCmsSizes)
export const updateSizeSchema = insertSizeSchema.partial()

export const createNewSize = async (
  values: z.infer<typeof insertSizeSchema>,
  userId: string
) => {
  const store = await fetchStoreById(values.storeId)

  if (!store || store.userId !== userId) throw new Error("Bad request")

  const sizeData = await db
    .insert(ecomCmsSizes)
    .values({ ...values, updatedAt: currentDate() })
    .returning()
  return sizeData[0]
}

export const updateSize = async (
  values: z.infer<typeof updateSizeSchema>,
  id: string,
  userId: string
) => {
  if (!values.storeId) throw new Error("Bad request!")

  const store = await fetchStoreById(values.storeId)
  if (!store || store.userId !== userId) throw new Error("Bad request")

  await db
    .update(ecomCmsSizes)
    .set({ ...values, updatedAt: currentDate() })
    .where(and(eq(ecomCmsSizes.storeId, store.id), eq(ecomCmsSizes.id, id)))
}

export const deleteSize = async (storeId: string, sizeId: string) => {
  await db
    .delete(ecomCmsSizes)
    .where(and(eq(ecomCmsSizes.storeId, storeId), eq(ecomCmsSizes.id, sizeId)))
}
