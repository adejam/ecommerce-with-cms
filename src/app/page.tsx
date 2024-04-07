import { Button } from "@/components/ui/button"
import StoreModal from "@/components/modals/store-modal"
import { createAnonServerClient } from "@/lib/supabase/supabase-anon-server-client"
import Link from "next/link"
import { serverTrpc } from "@/trpc/server"
import AllStores from "@/components/all-stores"

export default async function Home() {
  const supabase = createAnonServerClient()
  const { data } = await supabase.auth.getUser()

  const stores = await serverTrpc.store.fetchAllStores()
  return (
    <main className="w-full h-screen">
      <div className="my-auto ">
        <div className="max-w-[800px] mx-auto flex justify-around mt-20 border-b pb-2">
          <StoreModal userId={data.user ? data.user.id : ""}>
            <Button className="w-auto">Create Store</Button>
          </StoreModal>
          <div>
            <Link className="text-primary" href="/my-stores">
              My stores
            </Link>
          </div>
        </div>

        <div>
          <AllStores initialData={stores} />
        </div>
      </div>
    </main>
  )
}
