"use client"

import ProductList from "@/components/store-front-ui/product-list"
import { trpc } from "@/trpc/react"
import { type FeaturedProducts } from "@/types"
import React from "react"

interface Props {
  storeId: string
  initialData: FeaturedProducts
}

const FeaturedProductsView = ({ initialData, storeId }: Props) => {
  const { data: items } = trpc.product.fetchFeaturedProducts.useQuery(storeId, {
    initialData,
    refetchInterval: 1000,
  })
  return <ProductList title="Featured Products" items={items} />
}

export default FeaturedProductsView
