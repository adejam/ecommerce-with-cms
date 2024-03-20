import MutateStoreForm from "@/components/forms/mutate-store-form"
import { Button } from "@/components/ui/button"
import StoreModal from "@/components/ui/store-modal"
import { createAnonServerClient } from "@/lib/supabase/supabase-anon-server-client"

export default async function Home() {
  const supabase = createAnonServerClient()
  const { data } = await supabase.auth.getUser()
  return (
    <main className="-white">
      <StoreModal userId={data.user ? data.user.id : ""}>
        <Button>Create Store</Button>
      </StoreModal>
    </main>
  )
}
