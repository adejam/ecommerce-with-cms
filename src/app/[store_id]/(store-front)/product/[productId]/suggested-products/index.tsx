"use client"

import ProductList from "@/components/store-front-ui/product-list"
import { trpc } from "@/trpc/react"
import { FeaturedProducts } from "@/types"
import React from "react"

interface Props {
  categoryId: string
  initialData: FeaturedProducts
}

const SuggestedProducts = ({ initialData, categoryId }: Props) => {
  const { data: items } = trpc.product.fetchProductsByCategory.useQuery(
    categoryId,
    {
      initialData,
      refetchInterval: 1000,
    }
  )
  return <ProductList title="Related Items" items={items} />
}

export default SuggestedProducts
