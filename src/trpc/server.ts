import "server-only"

import { headers } from "next/headers"
import { cache } from "react"

import { createCaller } from "@/server/api/root"
import { createTRPCContext } from "@/server/api/trpc"
import { createAnonServerClient } from "@/lib/supabase/supabase-anon-server-client"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const supabase = createAnonServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const heads = new Headers(headers())
  heads.set("x-trpc-source", "rsc")

  return createTRPCContext({
    auth: session,
    headers: heads,
  })
})

export const serverTrpc = createCaller(createContext)
