import { ProductForm } from "@/components/forms/product-form"
import { serverTrpc } from "@/trpc/server"

const ProductPage = async ({
  params: { store_id, productId },
}: {
  params: { productId: string; store_id: string }
}) => {
  const id = productId === "new" ? store_id : productId
  const product = await serverTrpc.product.fetchProduct({
    storeId: store_id,
    productId: id,
  })

  const categories = await serverTrpc.category.fetchCategories(store_id)

  const sizes = await serverTrpc.size.fetchSizes(store_id)

  const colors = await serverTrpc.color.fetchColors(store_id)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  )
}

export default ProductPage
