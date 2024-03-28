import {
  createNewSize,
  deleteSize,
  fetchSize,
  fetchSizes,
  insertSizeSchema,
  updateSize,
  updateSizeSchema,
} from "@/server/controllers/sizes.controller"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

const updateSizeSchemavalues = z.object({
  values: updateSizeSchema,
  id: z.string(),
})

export const sizesRouter = createTRPCRouter({
  fetchSizes: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await fetchSizes(input)
  }),
  fetchSize: protectedProcedure
    .input(z.object({ storeId: z.string(), sizeId: z.string() }))
    .query(async ({ input }) => {
      return await fetchSize(input.storeId, input.sizeId)
    }),
  createNewSize: protectedProcedure
    .input(insertSizeSchema)
    .mutation(async ({ ctx, input }) => {
      return await createNewSize(input, ctx.session.user.id)
    }),
  updateSize: protectedProcedure
    .input(updateSizeSchemavalues)
    .mutation(async ({ ctx, input }) => {
      return await updateSize(input.values, input.id, ctx.session.user.id)
    }),
  deleteSize: protectedProcedure
    .input(z.object({ storeId: z.string(), sizeId: z.string() }))
    .mutation(async ({ input }) => {
      await deleteSize(input.storeId, input.sizeId)
      return true
    }),
})
