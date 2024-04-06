import { ecomCmsColors } from "../../../drizzle/schema"
import { db } from "../db"
import { and, eq } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { type z } from "zod"
import { fetchStoreById } from "./store.controller"
import { currentDate } from "@/lib/utils"

export const fetchColors = async (storeId: string) => {
  if (!storeId) throw new Error("Bad request.")
  return await db
    .select()
    .from(ecomCmsColors)
    .where(eq(ecomCmsColors.storeId, storeId))
}

export const fetchColor = async (storeId: string, colorId: string) => {
  if (!storeId || !colorId) throw new Error("Bad request.")
  return await db.query.ecomCmsColors.findFirst({
    where: (ecomCmsColors, { eq }) =>
      and(eq(ecomCmsColors.storeId, storeId), eq(ecomCmsColors.id, colorId)),
  })
}

export const insertColorschema = createInsertSchema(ecomCmsColors)
export const updateColorschema = insertColorschema.partial()

export const createNewColor = async (
  values: z.infer<typeof insertColorschema>,
  userId: string
) => {
  const store = await fetchStoreById(values.storeId)

  if (!store || store.userId !== userId) throw new Error("Bad request")

  const ColorData = await db
    .insert(ecomCmsColors)
    .values({ ...values, updatedAt: currentDate() })
    .returning()
  return ColorData[0]
}

export const updateColor = async (
  values: z.infer<typeof updateColorschema>,
  id: string,
  userId: string
) => {
  if (!values.storeId) throw new Error("Bad request!")

  const store = await fetchStoreById(values.storeId)
  if (!store || store.userId !== userId) throw new Error("Bad request")

  await db
    .update(ecomCmsColors)
    .set({ ...values, updatedAt: currentDate() })
    .where(and(eq(ecomCmsColors.storeId, store.id), eq(ecomCmsColors.id, id)))
}

export const deleteColor = async (storeId: string, colorId: string) => {
  await db
    .delete(ecomCmsColors)
    .where(
      and(eq(ecomCmsColors.storeId, storeId), eq(ecomCmsColors.id, colorId))
    )
}
