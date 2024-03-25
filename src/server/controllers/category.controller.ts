import { ecomCmsCategories } from "./../../../drizzle/schema"
import { db } from "../db"
import { and, eq } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { fetchStoreById } from "./store.controller"
import { currentDate } from "@/lib/utils"

export const fetchCategories = async (storeId: string) => {
  if (!storeId) throw new Error("Bad request.")
  return await db.query.ecomCmsCategories.findMany({
    where: (ecomCmsCategories, { eq }) =>
      and(eq(ecomCmsCategories.storeId, storeId)),
    orderBy: (ecomCmsCategories, { desc }) => [
      desc(ecomCmsCategories.createdAt),
    ],
    with: {
      billboard: true,
    },
  })
}

export const fetchCategory = async (storeId: string, categoryId: string) => {
  if (!storeId || !categoryId) throw new Error("Bad request.")
  return await db.query.ecomCmsCategories.findFirst({
    where: (ecomCmsCategories, { eq }) =>
      and(
        eq(ecomCmsCategories.storeId, storeId),
        eq(ecomCmsCategories.id, categoryId)
      ),
    with: {
      billboard: true,
    },
  })
}

export const insertCategorySchema = createInsertSchema(ecomCmsCategories)
export const updateCategorySchema = insertCategorySchema.partial()

export const createNewCategory = async (
  values: z.infer<typeof insertCategorySchema>,
  userId: string
) => {
  const store = await fetchStoreById(values.storeId)

  if (!store || store.userId !== userId) throw new Error("Bad request")

  const categoryData = await db
    .insert(ecomCmsCategories)
    .values({ ...values, updatedAt: currentDate() })
    .returning()
  return categoryData[0]
}

export const updateCategory = async (
  values: z.infer<typeof updateCategorySchema>,
  id: string,
  userId: string
) => {
  if (!values.storeId) throw new Error("Bad request!")

  const store = await fetchStoreById(values.storeId)
  if (!store || store.userId !== userId) throw new Error("Bad request")

  await db
    .update(ecomCmsCategories)
    .set({ ...values, updatedAt: currentDate() })
    .where(
      and(eq(ecomCmsCategories.storeId, store.id), eq(ecomCmsCategories.id, id))
    )
}

export const deleteCategory = async (storeId: string, categoryId: string) => {
  await db
    .delete(ecomCmsCategories)
    .where(
      and(
        eq(ecomCmsCategories.storeId, storeId),
        eq(ecomCmsCategories.id, categoryId)
      )
    )
}
