"use Table"

import { DataTable } from "@/components/ui/data-table"
import { format } from "date-fns"
import { currencyFormatter } from "@/lib/utils"
import { trpc } from "@/trpc/react"
import { StoreOrders } from "@/types"

import { columns, OrderColumn } from "./columns"

interface OrderTableProps {
  initialData: StoreOrders
  storeId: string
}

export const OrderTable: React.FC<OrderTableProps> = ({
  initialData,
  storeId,
}) => {
  const { data: orders } = trpc.order.fetchStoreOrders.useQuery(storeId, {
    initialData,
  })

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone || "",
    address: item.address || "",
    products: item.orderItems.map((orderItem) => orderItem.name).join(", "),
    totalPrice: currencyFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.price)
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: item.createdAt ? format(item.createdAt, "MMMM do, yyyy") : "",
  }))

  return (
    <>
      <DataTable
        searchKey="products"
        columns={columns}
        data={formattedOrders}
      />
    </>
  )
}
