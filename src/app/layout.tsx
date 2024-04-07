import "@/styles/globals.css"

import { Inter } from "next/font/google"

import { TRPCReactProvider } from "@/trpc/react"
import ThemeProvider from "@/components/theme-toggle/theme-provider"
import { NetworkIndicator } from "@/components/ui/network-indicator"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "CMS Driven Store",
  description: "A CMS Driven store for buyers and sellers",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <NetworkIndicator />
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
