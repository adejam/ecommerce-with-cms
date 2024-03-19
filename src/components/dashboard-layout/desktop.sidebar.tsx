"use client"

import { useParams, usePathname } from "next/navigation"
import React from "react"
import { DashboardNav } from "../dashboard-nav"
import { navItems } from "./mobile-sidebar"

const DesktopSidebar = () => {
  const pathname = usePathname()
  const params = useParams()
  return <DashboardNav items={navItems(pathname, params.store_id as string)} />
}

export default DesktopSidebar
