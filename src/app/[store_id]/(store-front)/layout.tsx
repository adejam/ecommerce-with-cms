import Footer from "@/components/store-front-ui/footer"
import Navbar from "@/components/store-front-ui/navbar"
import React from "react"

type Props = {
  params: {
    store_id: string
  }
  children: React.ReactNode
}

const layout = async ({ children, params: { store_id } }: Props) => {
  return (
    <>
      <Navbar storeId={store_id} />
      {children}
      <Footer />
    </>
  )
}

export default layout
