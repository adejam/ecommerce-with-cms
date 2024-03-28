import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import {
  fetchProduct,
  fetchProducts,
  createNewProduct,
  insertProductSchema,
  updateProductSchema,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  insertProductImageSchema,
  addProductImages,
  fetchFeaturedProducts,
  fetchProductsByCategory,
  fetchStorefrontProduct,
  fetchProductsByFilters,
} from "../../controllers/Product.controller"

const updateProductSchemavalues = z.object({
  values: updateProductSchema,
  id: z.string(),
})

export const productRouter = createTRPCRouter({
  fetchProducts: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await fetchProducts(input)
    }),
  fetchProduct: protectedProcedure
    .input(z.object({ storeId: z.string(), productId: z.string() }))
    .query(async ({ input }) => {
      return await fetchProduct(input.storeId, input.productId)
    }),
  createNewProduct: protectedProcedure
    .input(insertProductSchema)
    .mutation(async ({ ctx, input }) => {
      return await createNewProduct(input, ctx.session.user.id)
    }),
  updateProduct: protectedProcedure
    .input(updateProductSchemavalues)
    .mutation(async ({ ctx, input }) => {
      return await updateProduct(input.values, input.id, ctx.session.user.id)
    }),
  deleteProduct: protectedProcedure
    .input(z.object({ storeId: z.string(), productId: z.string() }))
    .mutation(async ({ input }) => {
      await deleteProduct(input.storeId, input.productId)
      return true
    }),
  deleteProductImage: protectedProcedure
    .input(z.object({ productId: z.string(), imageId: z.string() }))
    .mutation(async ({ input }) => {
      const res = await deleteProductImage(input.productId, input.imageId)
      return res
    }),
  addProductImages: protectedProcedure
    .input(
      z.object({ values: z.array(insertProductImageSchema), id: z.string() })
    )
    .mutation(async ({ input }) => {
      const res = await addProductImages(input.values, input.id)
      return res
    }),
  fetchFeaturedProducts: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await fetchFeaturedProducts(input)
    }),
  fetchProductsByCategory: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await fetchProductsByCategory(input)
    }),

  fetchStorefrontProduct: publicProcedure
    .input(z.object({ storeId: z.string(), productId: z.string() }))
    .query(async ({ input }) => {
      return await fetchStorefrontProduct(input.storeId, input.productId)
    }),

  fetchProductsByFilters: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
        colorId: z.string().optional(),
        sizeId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return await fetchProductsByFilters({ ...input })
    }),
})
