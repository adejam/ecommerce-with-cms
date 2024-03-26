import { serverTrpc } from "@/trpc/server"
import { Heading } from "@/components/ui/heading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ProductsTable } from "@/components/tables/product-table"

const ProductsPage = async ({
  params: { store_id },
}: {
  params: { store_id: string }
}) => {
  const products = await serverTrpc.product.fetchProducts(store_id)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
              <Heading title={"Products"} description="Manage store products" />
              <Link href={`/${store_id}/admin/products/new`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
              </Link>
            </div>
            <Separator />
            <ProductsTable initialData={products} storeId={store_id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
