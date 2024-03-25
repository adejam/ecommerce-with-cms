import { ColorForm } from "@/components/forms/color-form"
import { serverTrpc } from "@/trpc/server"

const ColorPage = async ({
  params: { store_id, colorId },
}: {
  params: { colorId: string; store_id: string }
}) => {
  const colorIdd = colorId === "new" ? store_id : colorId
  const color = await serverTrpc.color.fetchColor({
    storeId: store_id,
    colorId: colorIdd,
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default ColorPage
