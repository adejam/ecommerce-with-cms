"use server"

import { createAnonServerClient } from "@/lib/supabase/supabase-anon-server-client"
import { redirect } from "next/navigation"

export const fetchUserDataOrRouteToAuthPage = async () => {
  const supabase = createAnonServerClient()
  const { data } = await supabase.auth.getUser()

  if (!data || !data.user) {
    redirect("/login")
  }

  return data.user
}
