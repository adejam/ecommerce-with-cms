import MutateStoreForm from "@/components/forms/mutate-store-form"
import { Button } from "@/components/ui/button"
import { createAnonServerClient } from "@/lib/supabase/supabase-anon-server-client"

export default async function Home() {
  const supabase = createAnonServerClient()
  const { data } = await supabase.auth.getUser()
  return (
    <main className="-white">
      <MutateStoreForm userId={data.user ? data.user.id : ""}>
        <Button>Create Store</Button>
      </MutateStoreForm>
    </main>
  )
}
