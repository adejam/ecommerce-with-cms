import { fetchUserDataOrRouteToAuthPage } from "@/app/actions"
import React from "react"

type Props = {
  params: {
    store_id: string
  }
}

const page = async ({ params: { store_id } }: Props) => {
  await fetchUserDataOrRouteToAuthPage()

  return <div>{store_id}</div>
}

export default page
