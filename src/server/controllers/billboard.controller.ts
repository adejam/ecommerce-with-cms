import { ecomCmsBillBoards } from "./../../../drizzle/schema"
import { db } from "../db"
import { and, eq } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { fetchStoreById } from "./store.controller"
import { currentDate } from "@/lib/utils"

export const fetchBillboards = async (storeId: string) => {
  if (!storeId) throw new Error("Bad request.")
  return await db
    .select()
    .from(ecomCmsBillBoards)
    .where(eq(ecomCmsBillBoards.storeId, storeId))
}

export const fetchBillboard = async (storeId: string, billboardId: string) => {
  if (!storeId || !billboardId) throw new Error("Bad request.")
  const billboards = await db
    .select()
    .from(ecomCmsBillBoards)
    .where(
      and(
        eq(ecomCmsBillBoards.storeId, storeId),
        eq(ecomCmsBillBoards.id, billboardId)
      )
    )

  return billboards[0]
}

export const deleteBillboard = async (storeId: string, billboardId: string) => {
  await db
    .delete(ecomCmsBillBoards)
    .where(
      and(
        eq(ecomCmsBillBoards.storeId, storeId),
        eq(ecomCmsBillBoards.id, billboardId)
      )
    )
}

export const insertBillboardSchema = createInsertSchema(ecomCmsBillBoards)
export const updateBillboardSchema =
  createInsertSchema(ecomCmsBillBoards).partial()

export const createNewBillboard = async (
  values: z.infer<typeof insertBillboardSchema>,
  userId: string
) => {
  const store = await fetchStoreById(values.storeId)

  if (!store || store.userId !== userId) throw new Error("Bad request")

  const storeData = await db
    .insert(ecomCmsBillBoards)
    .values({ ...values, updatedAt: currentDate() })
    .returning()
  return storeData[0]
}

export const updateBillboard = async (
  values: z.infer<typeof updateBillboardSchema>,
  id: string,
  userId: string
) => {
  if (!values.storeId) throw new Error("Bad request!")

  const store = await fetchStoreById(values.storeId)
  if (!store || store.userId !== userId) throw new Error("Bad request")

  await db
    .update(ecomCmsBillBoards)
    .set({ ...values, updatedAt: currentDate() })
    .where(
      and(eq(ecomCmsBillBoards.storeId, store.id), eq(ecomCmsBillBoards.id, id))
    )
}
