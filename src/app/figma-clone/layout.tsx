import React from "react"
import "@liveblocks/react-comments/styles.css"
import { Work_Sans } from "next/font/google"
import { Room } from "@/providers/liveblocks/room"

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

type Props = {
  children: React.ReactNode
}

const page = async ({ children }: Props) => {
  return (
    <div className={`${workSans.className} bg-gray-200 min-h-screen`}>
      <Room>{children}</Room>
    </div>
  )
}

export default page
