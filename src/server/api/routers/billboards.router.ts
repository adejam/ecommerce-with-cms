import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import {
  fetchBillboard,
  fetchBillboards,
  createNewBillboard,
  insertBillboardSchema,
  updateBillboardSchema,
  updateBillboard,
  deleteBillboard,
} from "./../../controllers/billboard.controller"

const updateBillboardSchemavalues = z.object({
  values: updateBillboardSchema,
  id: z.string(),
})

export const billboardRouter = createTRPCRouter({
  fetchBillboards: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await fetchBillboards(input)
    }),
  fetchBillboard: protectedProcedure
    .input(z.object({ storeId: z.string(), billboardId: z.string() }))
    .query(async ({ input }) => {
      return await fetchBillboard(input.storeId, input.billboardId)
    }),
  createNewBillboard: protectedProcedure
    .input(insertBillboardSchema)
    .mutation(async ({ ctx, input }) => {
      return await createNewBillboard(input, ctx.session.user.id)
    }),
  updateBillboard: protectedProcedure
    .input(updateBillboardSchemavalues)
    .mutation(async ({ ctx, input }) => {
      return await updateBillboard(input.values, input.id, ctx.session.user.id)
    }),
  deleteBillboard: protectedProcedure
    .input(z.object({ storeId: z.string(), billboardId: z.string() }))
    .mutation(async ({ input }) => {
      await deleteBillboard(input.storeId, input.billboardId)
      return true
    }),
})
