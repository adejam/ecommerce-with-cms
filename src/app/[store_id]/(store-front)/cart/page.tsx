"use client"

import { useEffect, useMemo, useState } from "react"

import Container from "@/components/ui/container"
import useCart from "@/hooks/use-cart"

import Summary from "./components/summary"
import CartItem from "./components/cart-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"

export const revalidate = 0
interface Props {
  params: {
    store_id: string
  }
  searchParams: {
    oid: string
  }
}

const CartPage = async ({
  params: { store_id },
  searchParams: { oid },
}: Props) => {
  const [isMounted, setIsMounted] = useState(false)
  const cart = useCart()

  const items = useMemo(
    () =>
      cart.items.filter((item) =>
        store_id ? item?.storeId === store_id : item
      ),
    [cart.items]
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          {!oid && (
            <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          )}

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {items.length === 0 && !oid && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
              {!oid && (
                <ul>
                  {cart.items.map((item) => (
                    <CartItem key={item?.id} data={item} />
                  ))}
                </ul>
              )}
            </div>
            {!oid && <Summary />}
          </div>
          {oid && (
            <Card className="mx-auto max-w-sm">
              <CardHeader className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                <CardTitle>Success</CardTitle>
              </CardHeader>
              <CardContent>
                Your order is being processed. You can track your order using
                the order ID: {oid}
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </div>
  )
}

export default CartPage
