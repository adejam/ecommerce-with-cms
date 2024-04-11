"use client"

import React from "react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import "@solana/wallet-adapter-react-ui/styles.css"
import { useWallet } from "@solana/wallet-adapter-react"
import useCashApp from "@/hooks/use-cash-app"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const Page = () => {
  const { connected, publicKey, connecting, avatar, userAddress } = useCashApp()
  // console.log(avatar, userAddress)
  return (
    <div>
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="relative w-[200px] h-[200px]">
        <Image className="absolute" alt="" fill src={avatar} />
      </div>
      <WalletMultiButton />
    </div>
  )
}

export default Page
