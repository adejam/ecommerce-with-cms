import { BillboardTable } from "@/components/tables/billboards-table/billboard-table"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { serverTrpc } from "@/trpc/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import React from "react"

type Props = {
  params: {
    store_id: string
  }
}

const page = async ({ params: { store_id } }: Props) => {
  const billboards = await serverTrpc.billboard.fetchBillboards(store_id)
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={"Billboards"}
            description="Manage billboards for your store"
          />
          <Link href={`/${store_id}/admin/billboards/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>
        <Separator />
        <BillboardTable initialData={billboards} storeId={store_id} />
      </div>
    </div>
  )
}

export default page
