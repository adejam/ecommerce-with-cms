"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns, CategoryColumn } from "./columns"
import { Categories } from "@/types"
import { trpc } from "@/trpc/react"
import { format } from "date-fns"

interface CategoriesTableProps {
  initialData: Categories
  storeId: string
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
  initialData,
  storeId,
}) => {
  const { data } = trpc.category.fetchCategories.useQuery(storeId, {
    initialData,
  })

  const formattedCategories: CategoryColumn[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: item.createdAt ? format(item.createdAt, "MMMM do, yyyy") : "",
  }))

  return (
    <>
      <DataTable
        searchKey="name"
        columns={columns}
        data={formattedCategories}
      />
    </>
  )
}
