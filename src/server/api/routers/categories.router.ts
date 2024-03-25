import {
  fetchCategories,
  fetchCategory,
  createNewCategory,
  insertCategorySchema,
  updateCategorySchema,
  updateCategory,
  deleteCategory,
} from "./../../controllers/category.controller"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

const updateCategorySchemavalues = z.object({
  values: updateCategorySchema,
  id: z.string(),
})

export const categoriesRouter = createTRPCRouter({
  fetchCategories: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await fetchCategories(input)
    }),
  fetchCategory: protectedProcedure
    .input(z.object({ storeId: z.string(), categoryId: z.string() }))
    .query(async ({ input }) => {
      return await fetchCategory(input.storeId, input.categoryId)
    }),
  createNewCategory: protectedProcedure
    .input(insertCategorySchema)
    .mutation(async ({ ctx, input }) => {
      return await createNewCategory(input, ctx.session.user.id)
    }),
  updateCategory: protectedProcedure
    .input(updateCategorySchemavalues)
    .mutation(async ({ ctx, input }) => {
      return await updateCategory(input.values, input.id, ctx.session.user.id)
    }),
  deleteCategory: protectedProcedure
    .input(z.object({ storeId: z.string(), categoryId: z.string() }))
    .mutation(async ({ input }) => {
      await deleteCategory(input.storeId, input.categoryId)
      return true
    }),
})
