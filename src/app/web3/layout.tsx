import dynamic from "next/dynamic"
import React from "react"

const WallectConnectionProvider = dynamic(
  () => import("@/providers/web3/WalletConnectionProvider"),
  {
    ssr: false,
  }
)

type Props = {
  children: React.ReactNode
}

const page = async ({ children }: Props) => {
  return <WallectConnectionProvider>{children}</WallectConnectionProvider>
}

export default page
