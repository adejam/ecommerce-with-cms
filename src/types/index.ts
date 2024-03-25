import { serverTrpc } from "./../trpc/server"
export type Store = Awaited<
  ReturnType<(typeof serverTrpc)["store"]["fetchStoreById"]>
>

export type Stores = Awaited<
  ReturnType<(typeof serverTrpc)["store"]["fetchAllUserStores"]>
>

export type Billboard = Awaited<
  ReturnType<(typeof serverTrpc)["billboard"]["fetchBillboard"]>
>

export type Billboards = Awaited<
  ReturnType<(typeof serverTrpc)["billboard"]["fetchBillboards"]>
>

export type Category = Awaited<
  ReturnType<(typeof serverTrpc)["category"]["fetchCategory"]>
>

export type Categories = Awaited<
  ReturnType<(typeof serverTrpc)["category"]["fetchCategories"]>
>

export type Size = Awaited<ReturnType<(typeof serverTrpc)["size"]["fetchSize"]>>

export type Sizes = Awaited<
  ReturnType<(typeof serverTrpc)["size"]["fetchSizes"]>
>

export type Color = Awaited<
  ReturnType<(typeof serverTrpc)["color"]["fetchColor"]>
>

export type Colors = Awaited<
  ReturnType<(typeof serverTrpc)["color"]["fetchColors"]>
>
