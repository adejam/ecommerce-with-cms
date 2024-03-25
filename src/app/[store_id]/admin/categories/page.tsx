import { serverTrpc } from "@/trpc/server"
import { Heading } from "@/components/ui/heading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CategoriesTable } from "@/components/tables/category-table.tsx"
type Props = {
  params: {
    store_id: string
  }
}

const page = async ({ params: { store_id } }: Props) => {
  const categories = await serverTrpc.category.fetchCategories(store_id)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={"Categories"}
            description="Manage categories for your store"
          />
          <Link href={`/${store_id}/admin/categories/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>
        <Separator />
        <CategoriesTable initialData={categories} storeId={store_id} />
      </div>
    </div>
  )
}

export default page
