import { orderRouter } from "./routers/orders.router"
import { colorsRouter } from "./routers/colors.router"
import { userRouter } from "@/server/api/routers/user"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"
import { billboardRouter } from "./routers/billboards.router"
import { categoriesRouter } from "./routers/categories.router"
import { sizesRouter } from "./routers/sizes.router"
import { storeRouter } from "./routers/store.router"
import { productRouter } from "./routers/products.router"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  store: storeRouter,
  billboard: billboardRouter,
  category: categoriesRouter,
  size: sizesRouter,
  color: colorsRouter,
  product: productRouter,
  order: orderRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
