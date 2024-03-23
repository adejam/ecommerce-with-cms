"use client"

import { Card, CardTitle } from "@/components/ui/card"
import { trpc } from "@/trpc/react"
import { Stores, type Store } from "@/types"
import Link from "next/link"
import React from "react"

type Props = {
  initialData: Stores
}

const StoresList = ({ initialData }: Props) => {
  const { data: stores } = trpc.store.fetchAllUserStores.useQuery(undefined, {
    initialData,
  })
  return (
    <div className="w-full p-4 min-h-screen flex justify-center items-center">
      <div className=" max-w-[600px] space-y-4 w-full">
        {stores.map((store) => (
          <Card
            className="min-h-[50px] flex justify-center items-center"
            key={store.id}
          >
            <CardTitle>
              <Link href={`${store.id}/admin`}>{store.name}</Link>
            </CardTitle>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StoresList
