"use server"

import { supabaseServerClient } from "@/lib/supabase/supabase-server-client"
import { getImageNameFromUrl } from "@/lib/utils"

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

export const deleteFile = async (fileName: string) => {
  const supabaseApiClient = supabaseServerClient()
  const { error } = await supabaseApiClient.storage
    .from("ecommerce_assets")
    .remove([`${fileName}`])
  if (error) {
    return {
      success: false,
      error: true,
      message: "An error occured while deleting file",
      data: null,
    }
  }

  return {
    success: true,
    error: false,
    message: "File deleted successfully",
    data: null,
  }
}

export const deleteFiles = async (fileNames: string[]) => {
  const supabaseApiClient = supabaseServerClient()
  const { error } = await supabaseApiClient.storage
    .from("ecommerce_assets")
    .remove([...fileNames])
  if (error) {
    return {
      success: false,
      error: true,
      message: "An error occured while deleting files",
      data: null,
    }
  }

  return {
    success: true,
    error: false,
    message: "Files deleted successfully",
    data: null,
  }
}

interface DeleteResourceAssetsInterface {
  resource: string
  resourceId: string
  resourceTarget: string
  assetFieldName: string
}

export const deleteResourceAssets = async ({
  resource,
  resourceId,
  resourceTarget,
  assetFieldName,
}: DeleteResourceAssetsInterface) => {
  const supabaseApiClient = supabaseServerClient()
  const { error, data } = await supabaseApiClient
    .from(resource)
    .select("*")
    .eq(resourceTarget, resourceId)

  if (data) {
    const assetsName = data.map((d) => getImageNameFromUrl(d[assetFieldName]))
    const res = await deleteFiles(assetsName)
    return res
  }
}

export const handleFileUploads = async (
  formData: FormData,
  storeId: string,
  currentImgUrl = "",
  folderPath = "billboards"
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

  if (currentImgUrl) {
    const currentImgName = getImageNameFromUrl(currentImgUrl)
    if (currentImgName) {
      const returnedData = await deleteFile(currentImgName)
      if (returnedData.error) {
        return { ...returnedData }
      }
    }
  }

  const { data, error } = await supabaseApiClient.storage
    .from("ecommerce_assets")
    .upload(`${folderPath}/${file.name}`, file, {
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
