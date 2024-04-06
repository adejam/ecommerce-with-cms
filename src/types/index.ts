import { type serverTrpc } from "./../trpc/server"
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

export type Product = Awaited<
  ReturnType<(typeof serverTrpc)["product"]["fetchProduct"]>
>

export type Products = Awaited<
  ReturnType<(typeof serverTrpc)["product"]["fetchProducts"]>
>

export type Image = { url: string; id: string; productId: string }

export type StoreOrders = Awaited<
  ReturnType<(typeof serverTrpc)["order"]["fetchStoreOrders"]>
>

export type UserOrders = Awaited<
  ReturnType<(typeof serverTrpc)["order"]["fetchUserOrders"]>
>

export type FeaturedProducts = Awaited<
  ReturnType<(typeof serverTrpc)["product"]["fetchFeaturedProducts"]>
>

export type StorefrontProduct = Awaited<
  ReturnType<(typeof serverTrpc)["product"]["fetchStorefrontProduct"]>
>

export type StoreOrder = Awaited<
  ReturnType<(typeof serverTrpc)["order"]["fetchStoreOrder"]>
>

export type NaveValueType = {
  name: string
  value: string
}
