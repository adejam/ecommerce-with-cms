"use client"

import useCart from "@/hooks/use-cart"
import { ShoppingBag } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ThemeToggle from "../theme-toggle/theme-toggle"
import { Button } from "../ui/button"

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false)
  const cart = useCart()
  const { store_id } = useParams()

  const numberOfCart = useMemo(
    () =>
      store_id
        ? cart.items.filter((item) => item?.storeId === store_id).length
        : 0,
    [cart.items]
  )
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const router = useRouter()

  if (!isMounted) {
    return null
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push(`/${store_id}/cart`)}
        className="flex items-center rounded-full px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {numberOfCart}
        </span>
      </Button>
    </div>
  )
}

export default NavbarActions
