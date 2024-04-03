import { supabaseBrowserClient } from "./../lib/supabase/subabase-browser-client"
import { useState } from "react"
import { trpc } from "@/trpc/react"

const useUserData = () => {
  const supabase = supabaseBrowserClient()
  const [signinOut, setSigninOut] = useState(false)
  const trpcContext = trpc.useUtils()
  const { data: user } = trpc.user.getUser.useQuery()

  const signOut = async () => {
    if (user) {
      setSigninOut(true)
      await supabase.auth
        .signOut()
        .then(async () => {
          await trpcContext.user.getUser.invalidate()
        })
        .finally(() => {
          setSigninOut(false)
        })
    }
  }

  return { user, signOut, signinOut }
}

export default useUserData
