import { serverTrpc } from "@/trpc/server"
import { Heading } from "@/components/ui/heading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ColorsTable } from "@/components/tables/color-table.tsx"
type Props = {
  params: {
    store_id: string
  }
}

const page = async ({ params: { store_id } }: Props) => {
  const colors = await serverTrpc.color.fetchColors(store_id)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={"Colors"}
            description="Manage color variants for your store"
          />
          <Link href={`/${store_id}/admin/colors/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>
        <Separator />
        <ColorsTable initialData={colors} storeId={store_id} />
      </div>
    </div>
  )
}

export default page
