import { DashboardNav } from "@/components/dashboard-nav"
import { cn } from "@/lib/utils"
import { Store, Stores } from "@/types"
import DesktopSidebar from "./desktop.sidebar"
import { navItems } from "./mobile-sidebar"
import StoreSwitcher from "./store-switcher"

export default function Sidebar({ stores }: { stores: Stores }) {
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r lg:block w-full max-w-72`
      )}
    >
      <div className="space-y-4 w-full">
        <div className="h-14 border-b flex px-5 items-center">
          <StoreSwitcher items={stores} />
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <DesktopSidebar />
          </div>
        </div>
      </div>
    </nav>
  )
}
