import { ecomCmsOrderItems } from "./../../../drizzle/schema"
import { ecomCmsOrders } from "../../../drizzle/schema"
import { db } from "../db"
import { and, eq } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { type z } from "zod"
import { fetchStoreById } from "./store.controller"
import { currentDate } from "@/lib/utils"

export const fetchStoreOrders = async (storeId: string) => {
  if (!storeId) throw new Error("Bad request.")
  return await db.query.ecomCmsOrders.findMany({
    where: (ecomCmsOrders, { eq }) => and(eq(ecomCmsOrders.storeId, storeId)),
    orderBy: (ecomCmsOrders, { desc }) => [desc(ecomCmsOrders.createdAt)],
    with: {
      orderItems: true,
    },
  })
}

export const fetchUserOrders = async (buyerId: string) => {
  if (!buyerId) throw new Error("Bad request.")
  return await db.query.ecomCmsOrders.findMany({
    where: (ecomCmsOrders, { eq }) => and(eq(ecomCmsOrders.buyerId, buyerId)),
    orderBy: (ecomCmsOrders, { desc }) => [desc(ecomCmsOrders.createdAt)],
    with: {
      orderItems: true,
      store: true,
    },
  })
}

export const fetchStoreOrder = async (storeId: string, orderId: string) => {
  if (!storeId || !orderId) throw new Error("Bad request.")
  return await db.query.ecomCmsOrders.findFirst({
    where: (ecomCmsOrders, { eq }) =>
      and(eq(ecomCmsOrders.storeId, storeId), eq(ecomCmsOrders.id, orderId)),
    orderBy: (ecomCmsOrders, { desc }) => [desc(ecomCmsOrders.createdAt)],
  })
}

export const fetchUserOrder = async (userId: string, orderId: string) => {
  if (!orderId || !userId) throw new Error("Bad request.")
  return await db.query.ecomCmsOrders.findFirst({
    where: (ecomCmsOrders, { eq }) =>
      and(eq(ecomCmsOrders.id, orderId), eq(ecomCmsOrders.buyerId, userId)),
    orderBy: (ecomCmsOrders, { desc }) => [desc(ecomCmsOrders.createdAt)],
  })
}

export const insertOrderSchema = createInsertSchema(ecomCmsOrders)
export const insertOrderItemSchema = createInsertSchema(ecomCmsOrderItems)

export const createNewOrder = async (
  values: z.infer<typeof insertOrderSchema>,
  orderItemsValues: z.infer<typeof insertOrderItemSchema>[]
) => {
  const store = await fetchStoreById(values.storeId)

  if (!store) throw new Error("Bad request")

  const orderData = await db
    .insert(ecomCmsOrders)
    .values({ ...values, updatedAt: currentDate() })
    .returning()
  const order = orderData[0]

  if (order) {
    const orderItemsData = orderItemsValues
      .filter((item) => item.productId)
      .map((item) => ({ ...item, orderId: order.id, updatedAt: currentDate() }))
    await db.insert(ecomCmsOrderItems).values([...orderItemsData])
  }

  return order
}

export const setPaymentMadeForPaid = async (
  storeId: string,
  orderId: string,
  userId: string
) => {
  if (!storeId || !orderId) throw new Error("Bad request!")

  const store = await fetchStoreById(storeId)
  if (!store || store.userId !== userId) throw new Error("Bad request")

  await db
    .update(ecomCmsOrders)
    .set({ isPaid: true, updatedAt: currentDate() })
    .where(
      and(eq(ecomCmsOrders.storeId, store.id), eq(ecomCmsOrders.id, orderId))
    )
}
