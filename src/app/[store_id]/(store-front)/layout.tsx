import Footer from "@/components/store-front-ui/footer"
import Navbar from "@/components/store-front-ui/navbar"
import PreviewModal from "@/components/store-front-ui/preview-modal"
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
      <PreviewModal />
      {children}
      <Footer />
    </>
  )
}

export default layout
