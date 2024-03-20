import React from "react"
import { fetchUserDataOrRouteToAuthPage } from "../actions"
import { serverTrpc } from "@/trpc/server"
import StoresList from "./display-all-stores"

const page = async () => {
  await fetchUserDataOrRouteToAuthPage()
  const stores = await serverTrpc.store.fetchAllUserStores()
  return (
    <div>
      <StoresList initialData={stores} />
    </div>
  )
}

export default page
