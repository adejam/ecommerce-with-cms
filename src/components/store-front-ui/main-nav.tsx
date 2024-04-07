"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Categories } from "@/types"
import { trpc } from "@/trpc/react"

interface MainNavProps {
  initialData: Categories
  storeId: string
}

const MainNav: React.FC<MainNavProps> = ({ initialData, storeId }) => {
  const { data } = trpc.category.fetchCategories.useQuery(storeId, {
    initialData,
  })

  const pathname = usePathname()

  const routes = data.map((route) => ({
    href: `/${storeId}/category/${route.id}`,
    label: route.name,
    active: pathname === `/${storeId}/category/${route.id}`,
  }))

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-black text-neutral-500"
        )}
      >
        Ecommerce CMS Home
      </Link>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav
