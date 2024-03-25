"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns, SizeColumn } from "./columns"
import { Sizes } from "@/types"
import { trpc } from "@/trpc/react"
import { format } from "date-fns"

interface SizesTableProps {
  initialData: Sizes
  storeId: string
}

export const SizesTable: React.FC<SizesTableProps> = ({
  initialData,
  storeId,
}) => {
  const { data: sizes } = trpc.size.fetchSizes.useQuery(storeId, {
    initialData,
  })

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt ? format(item.createdAt, "MMMM do, yyyy") : "",
  }))

  return (
    <>
      <DataTable searchKey="name" columns={columns} data={formattedSizes} />
    </>
  )
}
