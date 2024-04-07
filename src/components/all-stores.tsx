"use client"

import { Card, CardTitle } from "@/components/ui/card"
import { trpc } from "@/trpc/react"
import { Stores } from "@/types"
import Link from "next/link"
import React from "react"
import { Heading } from "./ui/heading"

type Props = {
  initialData: Stores
}

const AllStores = ({ initialData }: Props) => {
  const { data: stores } = trpc.store.fetchAllStores.useQuery(undefined, {
    initialData,
  })

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center mt-10">
      <Heading title="Recommended stores for you" description="" />
      <div className=" max-w-[600px] space-y-4 w-full">
        {stores.map((store) => (
          <Card
            className="min-h-[50px] flex justify-center items-center"
            key={store.id}
          >
            <CardTitle>
              <Link href={`${store.id}/`}>{store.name}</Link>
            </CardTitle>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AllStores
