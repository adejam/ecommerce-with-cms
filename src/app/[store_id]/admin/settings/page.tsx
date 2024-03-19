import { fetchUserDataOrRouteToAuthPage } from "@/app/actions"
import { SettingsForm } from "@/components/forms/settings-form"
import { serverTrpc } from "@/trpc/server"
import { notFound } from "next/navigation"
import React from "react"

type Props = {
  params: {
    store_id: string
  }
}

const page = async ({ params: { store_id } }: Props) => {
  const store = await serverTrpc.store.fetchStoreById(store_id)
  const user = await fetchUserDataOrRouteToAuthPage()
  if (!store) notFound()

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} userId={user ? user.id : ""} />
      </div>
    </div>
  )
}

export default page
