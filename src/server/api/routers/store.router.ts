import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import {
  createNewStore,
  insertStoreSchema,
} from "@/server/controllers/store.controller"

export const storeRouter = createTRPCRouter({
  createNewStore: protectedProcedure
    .input(insertStoreSchema)
    .mutation(async ({ ctx, input }) => {
      return await createNewStore(input, ctx.session.user.id)
    }),
})
