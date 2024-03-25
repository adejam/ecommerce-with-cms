import { CategoryForm } from "@/components/forms/category-form"
import { serverTrpc } from "@/trpc/server"

const CategoryPage = async ({
  params: { store_id, categoryId },
}: {
  params: { categoryId: string; store_id: string }
}) => {
  const categoryIdd = categoryId === "new" ? store_id : categoryId
  const category = await serverTrpc.category.fetchCategory({
    storeId: store_id,
    categoryId: categoryIdd,
  })
  const billboards = await serverTrpc.billboard.fetchBillboards(store_id)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboardsData={billboards} initialData={category} />
      </div>
    </div>
  )
}

export default CategoryPage
