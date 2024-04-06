import { trpc } from "@/trpc/react"
import { type Store } from "@/types"
import { storeSchema } from "@/validation-schemas/store.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

export type StoreFormValues = z.infer<typeof storeSchema>

const useMutateStore = (userId: string, initialData?: Store) => {
  const router = useRouter()
  const params = useParams()
  const [nameValue, setNameValue] = useState("")

  const { data: store } = trpc.store.fetchStoreById.useQuery(
    params.store_id! as string,
    {
      initialData,
    }
  )

  const trpcContext = trpc.useUtils()
  const { isPending, mutate } = trpc.store.createNewStore.useMutation({
    onSuccess: async (data) => {
      toast.success("Store successfully created")
      if (data) router.push(`/${data?.id}/admin`)
    },
    onError: () => {
      toast.error("An error occured")
    },
  })

  const { isPending: updateIsPending, mutate: mutateUpdateStore } =
    trpc.store.updateStore.useMutation({
      onSuccess: async () => {
        toast.success("Store successfully updated")
        await trpcContext.store.fetchStoreById.invalidate(store ? store.id : "")
        await trpcContext.store.fetchAllUserStores.invalidate()
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: store || {
      name: "",
    },
    mode: "onChange",
  })

  function onSubmit(values: StoreFormValues) {
    if (!userId) return
    if (store) {
      mutateUpdateStore({ values: { ...values, userId }, storeId: store.id })
      return
    }
    mutate({ ...values, userId })
  }

  const { isPending: deleteIsPending, mutate: deleteStoreMutationFunc } =
    trpc.store.deleteStore.useMutation({
      onSuccess: async () => {
        toast.success("Store successfully deleted")
        await trpcContext.store.fetchAllUserStores.invalidate()
        router.push("/my-stores")
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const deleteStore = () => {
    if (initialData) {
      if (initialData.name !== nameValue) return
      deleteStoreMutationFunc(initialData.id)
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
    deleteStore,
  }
}

export default useMutateStore
