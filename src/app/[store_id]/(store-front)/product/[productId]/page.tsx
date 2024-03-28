import Gallery from "@/components/store-front-ui/gallery"
import Info from "@/components/store-front-ui/info"
import Container from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { serverTrpc } from "@/trpc/server"
import { notFound } from "next/navigation"
import SuggestedProducts from "./suggested-products"

export const revalidate = 0

interface Props {
  params: {
    productId: string
    store_id: string
  }
}

const ProductPage = async ({ params: { productId, store_id } }: Props) => {
  const product = await serverTrpc.product.fetchStorefrontProduct({
    storeId: store_id,
    productId,
  })

  if (!product) {
    notFound()
  }

  const suggestedProducts = product.categoryId
    ? await serverTrpc.product.fetchProductsByCategory(product.categoryId)
    : []
  // console.log(sugge)
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info
                initialData={product}
                storeId={store_id}
                productId={productId}
              />
            </div>
          </div>
          <Separator />
          <SuggestedProducts
            initialData={suggestedProducts}
            categoryId={product.categoryId || ""}
          />
        </div>
      </Container>
    </div>
  )
}

export default ProductPage
