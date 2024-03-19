import { fetchUserDataOrRouteToAuthPage } from "@/app/actions"
import Header from "@/components/dashboard-layout/header"
import Sidebar from "@/components/dashboard-layout/sidebar"
import React from "react"

type Props = {
  params: {
    store_id: string
  }
  children: React.ReactNode
}

const page = async ({ children, params: { store_id } }: Props) => {
  await fetchUserDataOrRouteToAuthPage()

  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  )
}

export default page
