import { fetchUserDataOrRouteToAuthPage } from "@/app/actions"
import Header from "@/components/dashboard-layout/header"
import Sidebar from "@/components/dashboard-layout/sidebar"
import { serverTrpc } from "@/trpc/server"
import React from "react"

type Props = {
  children: React.ReactNode
}

const page = async ({ children }: Props) => {
  await fetchUserDataOrRouteToAuthPage()
  const stores = await serverTrpc.store.fetchAllUserStores()

  return (
    <div className="flex w-full">
      <Sidebar stores={stores} />
      <div className="flex w-full h-screen overflow-hidden">
        <Header idAdminDashboard />
        <main className="w-full pt-16">{children}</main>
      </div>
    </div>
  )
}

export default page
