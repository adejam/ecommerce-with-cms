import { trpc } from "@/trpc/react"
import { type Size } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import { sizeSchema } from "@/validation-schemas/size.schema"

export type SizeFormValues = z.infer<typeof sizeSchema>

const useMutateSize = (initialData?: Size) => {
  const router = useRouter()
  const params = useParams()
  const storeId = params.store_id! as string
  const sizeId = params.sizeId! as string
  const title = initialData ? "Edit size" : "Create size"
  const description = initialData ? "Edit a size." : "Add a new size"
  const toastMessage = initialData ? "Size updated." : "Size created."
  const buttonText = initialData ? "Save changes" : "Create"

  const { data: size } = trpc.size.fetchSize.useQuery(
    { storeId, sizeId },
    {
      initialData,
    }
  )

  const trpcContext = trpc.useUtils()
  const { isPending, mutate } = trpc.size.createNewSize.useMutation({
    onSuccess: async () => {
      toast.success(toastMessage)
      await trpcContext.size.fetchSizes.invalidate(storeId)
      router.push(`/${storeId}/admin/sizes`)
    },
    onError: () => {
      toast.error("An error occured")
    },
  })

  const { isPending: updateIsPending, mutate: mutateUpdateSize } =
    trpc.size.updateSize.useMutation({
      onSuccess: async () => {
        toast.success(toastMessage)
        await trpcContext.size.fetchSize.invalidate({
          storeId,
          sizeId,
        })
        await trpcContext.size.fetchSizes.invalidate(storeId)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(sizeSchema),
    defaultValues: size || {
      name: "",
      value: "",
    },
    mode: "onChange",
  })

  async function onSubmit(values: SizeFormValues) {
    if (!params.store_id) return
    if (size) {
      mutateUpdateSize({
        values: { ...values, storeId },
        id: sizeId,
      })
      return
    }
    mutate({
      ...values,
      storeId,
    })
  }

  const { isPending: deleteIsPending, mutate: deleteSizeMutationFunc } =
    trpc.size.deleteSize.useMutation({
      onSuccess: async () => {
        toast.success("Size successfully deleted")
        await trpcContext.size.fetchSizes.invalidate(storeId)
        router.push(`/${storeId}/admin/sizes`)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const deleteSize = async () => {
    if (size) {
      deleteSizeMutationFunc({ storeId, sizeId: size.id })
    }
  }

  return {
    form,
    isPending,
    mutate,
    onSubmit,
    updateIsPending,
    deleteIsPending,
    deleteSize,
    description,
    title,
    buttonText,
  }
}

export default useMutateSize
