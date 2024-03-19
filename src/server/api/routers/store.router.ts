import { z } from "zod"

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import {
  createNewStore,
  fetchStoreById,
  insertStoreSchema,
} from "@/server/controllers/store.controller"

export const storeRouter = createTRPCRouter({
  createNewStore: protectedProcedure
    .input(insertStoreSchema)
    .mutation(async ({ ctx, input }) => {
      return await createNewStore(input, ctx.session.user.id)
    }),
  fetchStoreById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await fetchStoreById(input)
  }),
})
