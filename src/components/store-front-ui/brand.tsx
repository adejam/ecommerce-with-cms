"use client"

import { trpc } from "@/trpc/react"
import { Store } from "@/types"
import Link from "next/link"
import React from "react"

type Props = {
  storeId: string
  initialData: Store
}

const Brand = ({ storeId, initialData }: Props) => {
  const { data: store } = trpc.store.fetchStoreById.useQuery(storeId, {
    initialData,
  })

  if (!store) return null
  return (
    <Link href={`/${storeId}`} className="ml-4 flex lg:ml-0 gap-x-2">
      <p className="font-bold text-xl">{store.name}</p>
    </Link>
  )
}

export default Brand
