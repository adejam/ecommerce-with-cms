import {
  createNewOrder,
  fetchStoreOrder,
  fetchStoreOrders,
  fetchUserOrder,
  insertOrderItemSchema,
  insertOrderSchema,
  setPaymentMadeForPaid,
} from "@/server/controllers/order.controller"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const orderRouter = createTRPCRouter({
  fetchStoreOrders: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await fetchStoreOrders(input)
    }),
  fetchStoreOrder: protectedProcedure
    .input(z.object({ storeId: z.string(), orderId: z.string() }))
    .query(async ({ input }) => {
      return await fetchStoreOrder(input.storeId, input.orderId)
    }),
  fetchUserOrder: protectedProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await fetchUserOrder(ctx.session.user.id, input.orderId)
    }),
  fetchUserOrders: protectedProcedure.query(async ({ ctx }) => {
    return await fetchStoreOrders(ctx.session.user.id)
  }),
  createNewOrder: protectedProcedure
    .input(
      z.object({
        values: insertOrderSchema,
        orderItemsValues: z.array(insertOrderItemSchema),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await createNewOrder(
        input.values,
        input.orderItemsValues,
        ctx.session.user.id
      )
    }),
  setPaymentMadeForPaid: protectedProcedure
    .input(z.object({ storeId: z.string(), orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await setPaymentMadeForPaid(
        input.storeId,
        input.orderId,
        ctx.session.user.id
      )
    }),
})
