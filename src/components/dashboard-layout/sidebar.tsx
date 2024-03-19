import { DashboardNav } from "@/components/dashboard-nav"
import { cn } from "@/lib/utils"
import { Store } from "@/types"
import { navItems } from "./mobile-sidebar"
import StoreSwitcher from "./store-switcher"

export default function Sidebar({ stores }: { stores: Store[] }) {
  return (
    <nav className={cn(`relative hidden h-screen border-r lg:block w-72`)}>
      <div className="space-y-4">
        <div className="h-14 border-b flex px-5 items-center">
          <StoreSwitcher items={stores} />
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  )
}