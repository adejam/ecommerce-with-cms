import { fetchAllUserStores } from "./../../controllers/store.controller"
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
  fetchAllUserStores: protectedProcedure.query(async ({ ctx }) => {
    return await fetchAllUserStores(ctx.session.user.id)
  }),
})