import { serverTrpc } from "@/trpc/server"
import { notFound } from "next/navigation"
import React from "react"

type Props = {
  params: {
    store_id: string
  }
  children: React.ReactNode
}

const page = async ({ children, params: { store_id } }: Props) => {
  const store = await serverTrpc.store.fetchStoreById(store_id)
  console.log(store)
  if (!store) {
    notFound()
  }

  return { children }
}

export default page
