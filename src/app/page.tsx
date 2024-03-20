import { Button } from "@/components/ui/button"
import StoreModal from "@/components/modals/store-modal"
import { createAnonServerClient } from "@/lib/supabase/supabase-anon-server-client"
import Link from "next/link"

export default async function Home() {
  const supabase = createAnonServerClient()
  const { data } = await supabase.auth.getUser()
  return (
    <main className="-white">
      <StoreModal userId={data.user ? data.user.id : ""}>
        <Button>Create Store</Button>
      </StoreModal>
      <Link className="text-primary" href="/my-stores">
        My stores
      </Link>
    </main>
  )
}
