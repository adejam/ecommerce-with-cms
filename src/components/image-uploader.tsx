"use client"

import { XCircleIcon } from "lucide-react"
import Image from "next/image"
import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "./ui/button"

interface Props {
  maxFilesToUploadAtOnce?: number
  MAX_FILE_SIZE?: number // this should be in bytes
  MAX_TOTAL_FILES?: number
  images: File[]
  setImages: (x: File[]) => void
  uploaderText?: string
  selectedImageView?: (images: File[]) => React.ReactNode
}

const ImageUploader: React.FC<Props> = ({
  images,
  setImages,
  maxFilesToUploadAtOnce = 5,
  MAX_TOTAL_FILES = 10,
  MAX_FILE_SIZE = 409600,
  uploaderText = "Drag 'n' drop some images here, or click to select files",
  selectedImageView,
}) => {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > MAX_TOTAL_FILES) {
        setError(`You can only upload a maximum of ${MAX_TOTAL_FILES} files.`)
        return
      }
      const filteredFiles = acceptedFiles.filter(
        (file) => file.size <= MAX_FILE_SIZE
      )

      if (filteredFiles.length < acceptedFiles.length) {
        setError(
          `Some files exceed the maximum file size of ${
            MAX_FILE_SIZE / 1024
          }KB and have been rejected.`
        )
      } else {
        setError(null)
      }

      setImages([...images, ...filteredFiles])
    },
    [images]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    maxFiles: maxFilesToUploadAtOnce,
    multiple: true,
  })

  return (
    <div className="bg-gray- rounded-lg p-4">
      <p className="text-red-600">{error}</p>
      {selectedImageView ? (
        selectedImageView(images)
      ) : (
        <div className="mb-3 flex flex-wrap gap-2">
          {images.map((file, index) => (
            <div className="relative h-32 w-32" key={index}>
              <Image
                alt=""
                className="rounded "
                layout="fill"
                objectFit="cover"
                src={URL.createObjectURL(file)}
              />
              <Button
                className="absolute right-1 top-1 m-0 h-auto w-auto !rounded-full p-1 text-white shadow-2xl"
                size={"icon"}
                variant="destructive"
                onClick={() => {
                  const newImages = [...images]
                  newImages.splice(index, 1)
                  setImages(newImages)
                }}
              >
                <XCircleIcon color="white" size={20} />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center"
      >
        <input {...getInputProps()} />
        <p>{uploaderText}</p>
      </div>
    </div>
  )
}

export { ImageUploader }
