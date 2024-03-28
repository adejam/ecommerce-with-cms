"use client"

import { trpc } from "@/trpc/react"
import { FeaturedProducts } from "@/types"
import React from "react"
import NoResults from "../no-results"
import ProductCard from "../product-card"

type Props = {
  initialData: FeaturedProducts
  categoryId: string
  colorId: string
  sizeId: string
}

const CategoryProducts = ({
  initialData,
  colorId,
  sizeId,
  categoryId,
}: Props) => {
  const { data: products } = trpc.product.fetchProductsByFilters.useQuery(
    { categoryId, colorId, sizeId },
    {
      initialData,
    }
  )

  return (
    <div className="mt-6 lg:col-span-4 lg:mt-0">
      {products.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default CategoryProducts
