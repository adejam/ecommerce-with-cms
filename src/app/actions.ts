"use server"

import { createAnonServerClient } from "@/lib/supabase/supabase-anon-server-client"
import { supabaseServerClient } from "@/lib/supabase/supabase-server-client"

import { serverTrpc } from "@/trpc/server"
import { redirect } from "next/navigation"

export const fetchUserDataOrRouteToAuthPage = async () => {
  const user = await serverTrpc.user.getUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

interface ActionReturnType {
  success: boolean
  error: boolean
  message: string
  data: any
}

export const handleFileUploads = async (
  formData: FormData,
  storeId: string
): Promise<ActionReturnType> => {
  const user = await serverTrpc.user.getUser()

  if (!user) {
    console.debug("User not authenticated")
    return {
      success: false,
      error: true,
      message: "User not authenticated",
      data: null,
    }
  }

  const store = await serverTrpc.store.fetchStoreById(storeId)

  if (!store) {
    console.debug(`Bad, Request. User does not have store wih id ${storeId}`)
    return { success: false, error: true, message: "Bad request", data: null }
  }

  if (store.userId !== user.id) {
    console.debug(
      `Bad, Request. User does not have access to store of id ${storeId}`
    )
    return { success: false, error: true, message: "Bad request", data: null }
  }

  const file = formData.get("file") as File

  const supabaseApiClient = supabaseServerClient()

  const { data, error } = await supabaseApiClient.storage
    .from("ecommerce_assets")
    .upload(`billboards/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    console.error(error)
    return {
      success: false,
      error: true,
      message: "An error occured while uploading file",
      data: null,
    }
  }

  if (data) {
    return { success: true, error: false, message: "Upload successful", data }
  }

  return { success: true, error: false, message: "Nothing happend", data: null }
}
