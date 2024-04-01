import { checkoutSchema } from "./../validation-schemas/checkout.schema"
import { trpc } from "@/trpc/react"
import { StorefrontProduct, StoreOrder } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import useCart from "./use-cart"

export type OrderFormValues = z.infer<typeof checkoutSchema>

const useMutateOrder = (
  initialData?: StoreOrder,
  cartItems?: StorefrontProduct[]
) => {
  const router = useRouter()
  const params = useParams()
  const storeId = params.store_id! as string
  const toastMessage = initialData
    ? "Order updated."
    : "Order successfully created. Your order is being processed."
  const buttonText = initialData ? "Save changes" : "Checkout"

  const { data: order } = trpc.order.fetchStoreOrder.useQuery(
    { storeId, orderId: initialData ? initialData.id : storeId },
    {
      initialData,
    }
  )

  const cart = useCart()

  const trpcContext = trpc.useUtils()
  const { isPending, mutate } = trpc.order.createNewOrder.useMutation({
    onSuccess: async (data) => {
      toast.success(toastMessage)
      cart.removeStoreCartItems(storeId || "")
      await trpcContext.order.fetchStoreOrders.invalidate(storeId)
      router.push(`/${storeId}/cart?oid=${data?.id}`)
    },
    onError: () => {
      toast.error("An error occured")
    },
  })

  const { isPending: updateIsPending, mutate: mutateUpdateOrder } =
    trpc.order.setPaymentMadeForPaid.useMutation({
      onSuccess: async () => {
        toast.success(toastMessage)
        await trpcContext.order.fetchStoreOrders.invalidate(storeId)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: order || {
      buyerEmail: "",
      address: "",
      phone: "",
    },
    mode: "onChange",
  })

  async function onSubmit(values: OrderFormValues) {
    if (!params.store_id || !cartItems) return
    const attributes = cartItems?.map((item) => {
      let attributesToReturn: any = {}
      if (item?.size) {
        attributesToReturn["size"] = {
          name: item.size.name,
          value: item.size.value,
        }
      }
      if (item?.color) {
        attributesToReturn["color"] = {
          name: item.color.name,
          value: item.color.value,
        }
      }
      return attributesToReturn
    })
    mutate({
      values: { ...values, storeId },
      orderItemsValues: cartItems?.map((item) => ({
        orderId: storeId,
        name: item?.name || "",
        productId: item?.id || "",
        price: item?.price || "",
        quantity: 1,
        attributes,
      })),
    })
  }

  return {
    form,
    isPending,
    mutate,
    onSubmit,
    updateIsPending,
    buttonText,
    mutateUpdateOrder,
  }
}

export default useMutateOrder
