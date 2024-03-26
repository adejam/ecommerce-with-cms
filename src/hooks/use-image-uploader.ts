import { handleFileUploads } from "@/app/actions"
import React, { useState } from "react"
import { toast } from "sonner"

type Props = {}

const useImageUploader = () => {
  const [images, setImages] = useState<File[]>([])
  const [savedImages, setSavedImages] = useState<
    { name: string; path: string }[]
  >([])
  const [failedImages, setFailedImages] = useState<File[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [imageError, setImageError] = useState("")

  const handleImageUpload = async (
    storeId: string,
    currentImageUrl = "",
    folderPath = ""
  ) => {
    setIsLoading(true)
    setUploadDone(false)
    setFailedImages([])
    setSavedImages([])
    const imgs: { name: string; path: string }[] = []
    if (images.length < 1) {
      toast.error("Select an image")
    } else {
      await Promise.all(
        images.map(async (image, index) => {
          const form = new FormData()
          form.append("file", image)

          const { error, success } = await handleFileUploads(
            form,
            storeId,
            currentImageUrl,
            folderPath
          )
          if (success) {
            setSavedImages((prevState) => [
              ...prevState,
              { name: image.name, path: "" },
            ])
            imgs.push({ name: image.name, path: "" })
          }

          if (error) {
            setFailedImages((prevState) => [...prevState, image])
          }

          if (index === images.length - 1) {
            setUploadDone(true)
            setIsLoading(false)
          }
        })
      )
    }

    return { success: true, images: imgs }
  }

  return {
    handleImageUpload,
    images,
    setImages,
    isLoading,
    setImageError,
    imageError,
    uploadDone,
    savedImages,
    failedImages,
  }
}

export default useImageUploader
