import { Button } from "@/components/ui/button"
import StoreModal from "@/components/modals/store-modal"
import { createAnonServerClient } from "@/lib/supabase/supabase-anon-server-client"
import Link from "next/link"

export default async function Home() {
  const supabase = createAnonServerClient()
  const { data } = await supabase.auth.getUser()
  return (
    <main className="w-full h-screen">
      <div className="my-auto ">
        <StoreModal userId={data.user ? data.user.id : ""}>
          <Button className="w-auto">Create Store</Button>
        </StoreModal>
        <div>
          <Link className="text-primary" href="/my-stores">
            My stores
          </Link>
        </div>
      </div>
    </main>
  )
}
