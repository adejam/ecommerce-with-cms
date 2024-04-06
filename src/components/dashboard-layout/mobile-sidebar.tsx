"use client"
import { DashboardNav } from "@/components/dashboard-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import { useState } from "react"
import { Icons } from "../icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon: keyof typeof Icons
  label?: string
  description?: string
  active: boolean
}

export const navItems = (pathname: string, storeId = ""): NavItem[] => [
  {
    title: "Dashboard",
    href: `/${storeId}/admin`,
    icon: "dashboard",
    label: "Dashboard",
    active: pathname === `/${storeId}/admin`,
  },
  {
    title: "Billboards",
    href: `/${storeId}/admin/billboards`,
    label: "Billboards",
    active: pathname === `/${storeId}/admin/billboards`,
    icon: "billboard",
  },
  {
    title: "Products",
    href: `/${storeId}/admin/products`,
    label: "Products",
    active: pathname === `/${storeId}/admin/products`,
    icon: "box",
  },
  {
    title: "Orders",
    href: `/${storeId}/admin/orders`,
    label: "Orders",
    active: pathname === `/${storeId}/admin/orders`,
    icon: "shoppingBag",
  },
  {
    title: "Categories",
    href: `/${storeId}/admin/categories`,
    label: "Categories",
    active: pathname === `/${storeId}/admin/categories`,
    icon: "grid",
  },
  {
    title: "Sizes",
    href: `/${storeId}/admin/sizes`,
    label: "Sizes",
    active: pathname === `/${storeId}/admin/sizes`,
    icon: "size",
  },
  {
    title: "Colors",
    href: `/${storeId}/admin/colors`,
    label: "Colors",
    active: pathname === `/${storeId}/admin/colors`,
    icon: "palette",
  },
  {
    title: "Settings",
    href: `/${storeId}/admin/settings`,
    label: "Settings",
    active: pathname === `/${storeId}/admin/settings`,
    icon: "settings",
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <DashboardNav
                  items={navItems(pathname, params.store_id as string)}
                  setOpen={setOpen}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
