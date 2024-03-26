"use client"

import { DataTable } from "@/components/ui/data-table"
import { currencyFormatter } from "@/lib/utils"
import { trpc } from "@/trpc/react"
import { Products } from "@/types"

import { ProductColumn, columns } from "./columns"
import { format } from "date-fns"

interface ProductsClientProps {
  initialData: Products
  storeId: string
}

export const ProductsTable: React.FC<ProductsClientProps> = ({
  initialData,
  storeId,
}) => {
  const { data: products } = trpc.product.fetchProducts.useQuery(storeId, {
    initialData,
  })

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: currencyFormatter.format(Number(item.price)),
    category: item.category.name,
    size: item?.size?.name || "",
    color: item?.color?.value || "",
    createdAt: item.createdAt ? format(item.createdAt, "MMMM do, yyyy") : "",
  }))

  return (
    <>
      <DataTable searchKey="name" columns={columns} data={formattedProducts} />
    </>
  )
}
