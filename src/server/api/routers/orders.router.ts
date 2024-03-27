import {
  fetchStoreOrder,
  fetchStoreOrders,
  fetchUserOrder,
} from "@/server/controllers/order.controller"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
// import {
//   fetchOrder,
//   fetchOrders,
//   createNewOrder,
//   insertOrderSchema,
//   updateOrderSchema,
//   updateOrder,
//   deleteOrder,
// } from "../../controllers/order.controller"

// const updateOrderSchemavalues = z.object({
//   values: updateOrderSchema,
//   id: z.string(),
// })

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
  // createNewOrder: protectedProcedure
  //   .input(insertOrderSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     return await createNewOrder(input, ctx.session.user.id)
  //   }),
  // updateOrder: protectedProcedure
  //   .input(updateOrderSchemavalues)
  //   .mutation(async ({ ctx, input }) => {
  //     return await updateOrder(input.values, input.id, ctx.session.user.id)
  //   }),
  // deleteOrder: protectedProcedure
  //   .input(z.object({ storeId: z.string(), OrderId: z.string() }))
  //   .mutation(async ({ input }) => {
  //     await deleteOrder(input.storeId, input.OrderId)
  //     return true
  //   }),
})
