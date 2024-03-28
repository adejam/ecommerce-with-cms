import BillboardView from "@/components/store-front-ui/billboard"
import CategoryProducts from "@/components/store-front-ui/components/category-products"
import Container from "@/components/ui/container"
import { serverTrpc } from "@/trpc/server"

import Filter from "../../../../../components/store-front-ui/components/filter"
import MobileFilters from "../../../../../components/store-front-ui/components/mobile-filters"

export const revalidate = 0

interface CategoryPageProps {
  params: {
    categoryId: string
    store_id: string
  }
  searchParams: {
    colorId: string
    sizeId: string
  }
}

const CategoryPage = async ({
  params: { store_id, categoryId },
  searchParams: { colorId, sizeId },
}: CategoryPageProps) => {
  const products = await serverTrpc.product.fetchProductsByFilters({
    categoryId,
    colorId,
    sizeId,
  })
  const colors = await serverTrpc.color.fetchColors(store_id)
  const sizes = await serverTrpc.size.fetchSizes(store_id)
  const category = await serverTrpc.category.fetchCategory({
    storeId: store_id,
    categoryId,
  })

  return (
    <div className="bg-white">
      <Container>
        <BillboardView initialData={category?.billboard} storeId={store_id} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <CategoryProducts
              initialData={products}
              colorId={colorId}
              sizeId={sizeId}
              categoryId={categoryId}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage
