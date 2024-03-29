import { ecomCmsOrders } from "../../../drizzle/schema"
import { db } from "../db"
import { and, eq } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
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
    // with: {
    //   orderItems: true,
    //   store: true
    // },
  })
}

export const fetchUserOrder = async (userId: string, orderId: string) => {
  if (!orderId || !userId) throw new Error("Bad request.")
  return await db.query.ecomCmsOrders.findFirst({
    where: (ecomCmsOrders, { eq }) =>
      and(eq(ecomCmsOrders.id, orderId), eq(ecomCmsOrders.buyerId, userId)),
    orderBy: (ecomCmsOrders, { desc }) => [desc(ecomCmsOrders.createdAt)],
    // with: {
    //   orderItems: true,
    //   store: true
    // },
  })
}

// export const deleteOrder = async (storeId: string, OrderId: string) => {
//   await db
//     .delete(ecomCmsOrders)
//     .where(
//       and(eq(ecomCmsOrders.storeId, storeId), eq(ecomCmsOrders.id, OrderId))
//     )
// }

// export const insertOrderSchema = createInsertSchema(ecomCmsOrders)
// export const updateOrderSchema = createInsertSchema(ecomCmsOrders).partial()

// export const createNewOrder = async (
//   values: z.infer<typeof insertOrderSchema>,
//   userId: string
// ) => {
//   const store = await fetchStoreById(values.storeId)

//   if (!store || store.userId !== userId) throw new Error("Bad request")

//   const OrderData = await db
//     .insert(ecomCmsOrders)
//     .values({ ...values, updatedAt: currentDate() })
//     .returning()
//   return OrderData[0]
// }

// export const updateOrder = async (
//   values: z.infer<typeof updateOrderSchema>,
//   id: string,
//   userId: string
// ) => {
//   if (!values.storeId) throw new Error("Bad request!")

//   const store = await fetchStoreById(values.storeId)
//   if (!store || store.userId !== userId) throw new Error("Bad request")

//   await db
//     .update(ecomCmsOrders)
//     .set({ ...values, updatedAt: currentDate() })
//     .where(and(eq(ecomCmsOrders.storeId, store.id), eq(ecomCmsOrders.id, id)))
// }
