import { supabaseBrowserClient } from "./../lib/supabase/subabase-browser-client"
import { useUser } from "@supabase/auth-helpers-react"
import { useState } from "react"

const useUserData = () => {
  const user = useUser()
  const supabase = supabaseBrowserClient()
  const [signinOut, setSigninOut] = useState(false)

  const signOut = () => {
    if (user) {
      setSigninOut(true)
      supabase.auth.signOut().finally(() => {
        setSigninOut(false)
      })
    }
  }

  return { user, signOut, signinOut }
}

export default useUserData
