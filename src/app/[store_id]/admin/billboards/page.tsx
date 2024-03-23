import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import Link from "next/link"
import React from "react"

type Props = {
  params: {
    store_id: string
  }
}

const page = ({ params: { store_id } }: Props) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Billboards (${0})`}
            description="Manage billboards for your store"
          />
          <Link href={`/${store_id}/admin/billboards/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>
        <Separator />
      </div>
    </div>
  )
}

export default page
