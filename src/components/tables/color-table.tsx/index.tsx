"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns, ColorColumn } from "./columns"
import { Colors } from "@/types"
import { trpc } from "@/trpc/react"
import { format } from "date-fns"

interface ColorsTableProps {
  initialData: Colors
  storeId: string
}

export const ColorsTable: React.FC<ColorsTableProps> = ({
  initialData,
  storeId,
}) => {
  const { data: colors } = trpc.color.fetchColors.useQuery(storeId, {
    initialData,
  })

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt ? format(item.createdAt, "MMMM do, yyyy") : "",
  }))

  return (
    <>
      <DataTable searchKey="name" columns={columns} data={formattedColors} />
    </>
  )
}
