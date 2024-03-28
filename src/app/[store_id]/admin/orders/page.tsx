import { serverTrpc } from "@/trpc/server"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { OrderTable } from "@/components/tables/store-order-table"

const OrdersPage = async ({
  params: { store_id },
}: {
  params: { store_id: string }
}) => {
  const orders = await serverTrpc.order.fetchStoreOrders(store_id)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={"Orders"}
            description="Manage orders for your store"
          />
        </div>
        <Separator />
        <OrderTable initialData={orders} storeId={store_id} />
      </div>
    </div>
  )
}

export default OrdersPage
