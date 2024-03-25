import { deleteFile } from "@/app/actions"
import { computeImageUrl, getImageNameFromUrl } from "@/lib/utils"
import { trpc } from "@/trpc/react"
import { Billboard, type Store } from "@/types"
import { billBoardSchema } from "@/validation-schemas/billboard.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import useImageUploader from "./use-image-uploader"

export type BillboardFormValues = z.infer<typeof billBoardSchema>

const useMutateBillboard = (initialData?: Billboard) => {
  const router = useRouter()
  const params = useParams()
  const storeId = params.store_id! as string
  const billboardId = params.billboardId! as string
  const title = initialData ? "Edit billboard" : "Create billboard"
  const description = initialData ? "Edit a billboard." : "Add a new billboard"
  const toastMessage = initialData
    ? "Billboard successfully updated."
    : "Billboard successfully created."
  const buttonText = initialData ? "Save changes" : "Create"

  const [nameValue, setNameValue] = useState("")
  // const [imageError, setImageError] = useState("")
  // const [images, setImages] = useState<File[]>([])
  const {
    handleImageUpload,
    images,
    setImages,
    isLoading: imageIsLoading,
    setImageError,
    imageError,
    savedImages,
  } = useImageUploader()

  const { data: billboard } = trpc.billboard.fetchBillboard.useQuery(
    { storeId, billboardId },
    {
      initialData,
    }
  )

  const trpcContext = trpc.useUtils()
  const { isPending, mutate } = trpc.billboard.createNewBillboard.useMutation({
    onSuccess: async () => {
      toast.success(toastMessage)
      await trpcContext.billboard.fetchBillboards.invalidate(storeId)
      router.push(`/${storeId}/admin/billboards`)
    },
    onError: () => {
      toast.error("An error occured")
    },
  })

  const { isPending: updateIsPending, mutate: mutateUpdateBillboard } =
    trpc.billboard.updateBillboard.useMutation({
      onSuccess: async () => {
        toast.success(toastMessage)
        await trpcContext.billboard.fetchBillboard.invalidate({
          storeId,
          billboardId,
        })
        await trpcContext.billboard.fetchBillboards.invalidate(storeId)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(billBoardSchema),
    defaultValues: billboard || {
      label: "",
      imageUrl: "",
    },
    mode: "onChange",
  })

  async function onSubmit(values: BillboardFormValues) {
    if (!params.store_id || !params.billboardId) return
    if (!billboard || (billboard && !values.imageUrl)) {
      if (!images.length) {
        setImageError("Add an image")
        return
      }
    }

    if (images.length) {
      const data = await handleImageUpload(
        storeId,
        (billboard && billboard.imageUrl) || ""
      )
      if (data.success && data.images[0]) {
        if (billboard) {
          mutateUpdateBillboard({
            values: {
              ...values,
              storeId,
              imageUrl: computeImageUrl(data.images[0].name),
            },
            id: billboardId,
          })
          return
        }

        mutate({
          ...values,
          storeId,
          imageUrl: computeImageUrl(data.images[0].name),
        })
      }
    } else {
      if (billboard)
        mutateUpdateBillboard({
          values: { ...values, storeId },
          id: billboardId,
        })
    }
  }

  const { isPending: deleteIsPending, mutate: deleteBillboardMutationFunc } =
    trpc.billboard.deleteBillboard.useMutation({
      onSuccess: async () => {
        toast.success("Billboard successfully deleted")
        await trpcContext.billboard.fetchBillboards.invalidate(storeId)
        router.push(`/${storeId}/admin/billboards`)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const deleteBillboard = async () => {
    if (billboard) {
      if (billboard.imageUrl) {
        const currentImgName = getImageNameFromUrl(billboard.imageUrl)
        if (currentImgName) {
          const res = await deleteFile(currentImgName)
          if (res.error) {
            toast.error("An error occured")
            return
          }
        }
      }

      deleteBillboardMutationFunc({ storeId, billboardId: billboard.id })
    }
  }

  return {
    form,
    isPending,
    mutate,
    onSubmit,
    updateIsPending,
    nameValue,
    setNameValue,
    deleteIsPending,
    deleteBillboard,
    description,
    title,
    buttonText,
    images,
    setImages,
    imageError,
    imageIsLoading,
  }
}

export default useMutateBillboard
