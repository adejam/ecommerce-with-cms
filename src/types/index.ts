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
