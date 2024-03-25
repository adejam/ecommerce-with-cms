"use client"

import { format } from "date-fns"
import { DataTable } from "@/components/ui/data-table"
import { columns, BillboardColumn } from "./columns"
import { trpc } from "@/trpc/react"
import { Billboards } from "@/types"

interface BillboardTableProps {
  initialData: Billboards
  storeId: string
}

export const BillboardTable: React.FC<BillboardTableProps> = ({
  storeId,
  initialData,
}) => {
  const { data } = trpc.billboard.fetchBillboards.useQuery(storeId, {
    initialData,
  })

  const formattedBillboards: BillboardColumn[] = data.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: item.createdAt ? format(item.createdAt, "MMMM do, yyyy") : null,
  }))

  return (
    <>
      <DataTable
        searchKey="label"
        columns={columns}
        data={formattedBillboards}
      />
    </>
  )
}
