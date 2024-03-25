"use client"

import { trpc } from "@/trpc/react"
import { Color } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { colorSchema } from "@/validation-schemas/color.schema"

export type ColorFormValues = z.infer<typeof colorSchema>

const useMutateColor = (initialData?: Color) => {
  const router = useRouter()
  const params = useParams()
  const storeId = params.store_id! as string
  const colorId = params.colorId! as string
  const title = initialData ? "Edit Color" : "Create Color"
  const description = initialData ? "Edit a color." : "Add a new color"
  const toastMessage = initialData ? "Color updated." : "Color created."
  const buttonText = initialData ? "Save changes" : "Create"

  const { data: color } = trpc.color.fetchColor.useQuery(
    { storeId, colorId },
    {
      initialData,
    }
  )

  const trpcContext = trpc.useUtils()
  const { isPending, mutate } = trpc.color.createNewColor.useMutation({
    onSuccess: async () => {
      toast.success(toastMessage)
      await trpcContext.color.fetchColors.invalidate(storeId)
      router.push(`/${storeId}/admin/colors`)
    },
    onError: () => {
      toast.error("An error occured")
    },
  })

  const { isPending: updateIsPending, mutate: mutateUpdateColor } =
    trpc.color.updateColor.useMutation({
      onSuccess: async () => {
        toast.success(toastMessage)
        await trpcContext.color.fetchColor.invalidate({
          storeId,
          colorId,
        })
        await trpcContext.color.fetchColors.invalidate(storeId)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: color || {
      name: "",
      value: "",
    },
    mode: "onChange",
  })

  async function onSubmit(values: ColorFormValues) {
    if (!params.store_id) return
    if (color) {
      mutateUpdateColor({
        values: { ...values, storeId },
        id: color.id,
      })
      return
    }
    mutate({
      ...values,
      storeId,
    })
  }

  const { isPending: deleteIsPending, mutate: deleteColorMutationFunc } =
    trpc.color.deleteColor.useMutation({
      onSuccess: async () => {
        toast.success("color successfully deleted")
        await trpcContext.color.fetchColors.invalidate(storeId)
        router.push(`/${storeId}/admin/colors`)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const deleteColor = async () => {
    if (color) {
      deleteColorMutationFunc({ storeId, colorId: color.id })
    }
  }

  return {
    form,
    isPending,
    mutate,
    onSubmit,
    updateIsPending,
    deleteIsPending,
    deleteColor,
    description,
    title,
    buttonText,
  }
}

export default useMutateColor
