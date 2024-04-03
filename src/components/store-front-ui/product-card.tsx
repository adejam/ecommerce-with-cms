"use client"

import Image from "next/image"
import { type MouseEventHandler } from "react"
import { Expand, ShoppingCart } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import Currency from "@/components/ui/currency"
import { type StorefrontProduct } from "@/types"
import { Button } from "../ui/button"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"

interface ProductCard {
  data: StorefrontProduct
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const router = useRouter()
  const cart = useCart()
  const params = useParams()
  const previewModal = usePreviewModal()

  const handleClick = () => {
    router.push(`/${params.store_id as string}/product/${data?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    previewModal.onOpen(data)
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    cart.addItem(data)
  }

  if (!data) return null

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.images?.[0]?.url || ""}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <Button
              className="rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
              onClick={onPreview}
              size={"icon"}
              variant="ghost"
            >
              <Expand size={20} className="text-gray-600" />
            </Button>

            <Button
              className="rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
              onClick={onAddToCart}
              size={"icon"}
              variant="ghost"
            >
              <ShoppingCart size={20} className="text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data?.name}</p>
        {data?.category && (
          <p className="text-sm text-gray-500">{data?.category?.name}</p>
        )}
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  )
}

export default ProductCard
