import { publicProcedure } from "@/server/api/trpc"
import {
  createNewColor,
  deleteColor,
  fetchColor,
  fetchColors,
  insertColorschema,
  updateColor,
  updateColorschema,
} from "@/server/controllers/color.controller"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

const updateColorSchemavalues = z.object({
  values: updateColorschema,
  id: z.string(),
})

export const colorsRouter = createTRPCRouter({
  fetchColors: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await fetchColors(input)
  }),
  fetchColor: protectedProcedure
    .input(z.object({ storeId: z.string(), colorId: z.string() }))
    .query(async ({ input }) => {
      return await fetchColor(input.storeId, input.colorId)
    }),
  createNewColor: protectedProcedure
    .input(insertColorschema)
    .mutation(async ({ ctx, input }) => {
      return await createNewColor(input, ctx.session.user.id)
    }),
  updateColor: protectedProcedure
    .input(updateColorSchemavalues)
    .mutation(async ({ ctx, input }) => {
      return await updateColor(input.values, input.id, ctx.session.user.id)
    }),
  deleteColor: protectedProcedure
    .input(z.object({ storeId: z.string(), colorId: z.string() }))
    .mutation(async ({ input }) => {
      await deleteColor(input.storeId, input.colorId)
      return true
    }),
})
