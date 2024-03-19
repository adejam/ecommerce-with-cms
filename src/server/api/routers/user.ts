import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { createAnonServerClient } from "@/lib/supabase/supabase-anon-server-client"

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  getUser: publicProcedure.query(async () => {
    const supabase = createAnonServerClient()
    const { data } = await supabase.auth.getUser()
    return data.user
  }),
})
