import { BillboardForm } from "@/components/forms/billboard-form"
import { serverTrpc } from "@/trpc/server"

const BillboardPage = async ({
  params: { billboardId, store_id },
}: {
  params: { billboardId: string; store_id: string }
}) => {
  const billboardIdd =
    billboardId === "new" ? "7c49d102-bbcd-4fd8-b4d2-94c96cbb074f" : billboardId
  const billboard = await serverTrpc.billboard.fetchBillboard({
    storeId: store_id,
    billboardId: billboardIdd,
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboardPage
