"use server"

import { serverTrpc } from "@/trpc/server"
import { redirect } from "next/navigation"

export const fetchUserDataOrRouteToAuthPage = async () => {
  const user = serverTrpc.user.getUser()

  if (!user) {
    redirect("/login")
  }

  return user
}
