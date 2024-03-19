import { fetchUserDataOrRouteToAuthPage } from "@/app/actions"
import Header from "@/components/dashboard-layout/header"
import Sidebar from "@/components/dashboard-layout/sidebar"
import { serverTrpc } from "@/trpc/server"
import React from "react"

type Props = {
  params: {
    store_id: string
  }
  children: React.ReactNode
}

const page = async ({ children, params: { store_id } }: Props) => {
  await fetchUserDataOrRouteToAuthPage()
  const stores = await serverTrpc.store.fetchAllUserStores()

  return (
    <div className="flex">
      <Sidebar stores={stores} />
      <div className="flex h-screen overflow-hidden">
        <Header idAdminDashboard />
        <main className="w-full pt-16">{children}</main>
      </div>
    </div>
  )
}

export default page
