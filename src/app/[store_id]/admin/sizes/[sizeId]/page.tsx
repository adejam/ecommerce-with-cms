import { SizeForm } from "@/components/forms/size-form"
import { serverTrpc } from "@/trpc/server"

const SizePage = async ({
  params: { store_id, sizeId },
}: {
  params: { sizeId: string; store_id: string }
}) => {
  const sizeIdd = sizeId === "new" ? store_id : sizeId
  const size = await serverTrpc.size.fetchSize({
    storeId: store_id,
    sizeId: sizeIdd,
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  )
}

export default SizePage
