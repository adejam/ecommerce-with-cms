import { serverTrpc } from "./../trpc/server"
export type Store = Awaited<
  ReturnType<(typeof serverTrpc)["store"]["fetchAllUserStores"]>
>[0]
