import BillboardView from "@/components/store-front-ui/billboard"
import Container from "@/components/ui/container"
import { serverTrpc } from "@/trpc/server"
import FeaturedProductsView from "./components/featured-products"

type Props = {
  params: {
    store_id: string
  }
}

const page = async ({ params: { store_id } }: Props) => {
  const products = await serverTrpc.product.fetchFeaturedProducts(store_id)
  const billboard =
    await serverTrpc.billboard.fetchStoreFrontBillboard(store_id)

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <BillboardView initialData={billboard} storeId={store_id} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <FeaturedProductsView initialData={products} storeId={store_id} />
        </div>
      </div>
    </Container>
  )
}

export default page
