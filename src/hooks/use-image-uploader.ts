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

  const handleImageUpload = async (storeId: string) => {
    setIsLoading(true)
    setUploadDone(false)
    setFailedImages([])
    setSavedImages([])
    if (images.length < 1) {
      toast.error("Select an image")
    } else {
      images.forEach(async (image, index) => {
        const form = new FormData()
        form.append("file", image)

        const { error, success } = await handleFileUploads(form, storeId)

        if (success) {
          setSavedImages((prevState) => [
            ...prevState,
            { name: image.name, path: "" },
          ])
        }

        if (error) {
          setFailedImages((prevState) => [...prevState, image])
        }

        if (index === images.length - 1) {
          setUploadDone(true)
        }
      })
    }

    return true
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
