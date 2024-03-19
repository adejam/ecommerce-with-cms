import { trpc } from "@/trpc/react"
import { Store } from "@/types"
import { storeSchema } from "@/validation-schemas/store.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

export type StoreFormValues = z.infer<typeof storeSchema>

const useMutateStore = (userId: string, initialData?: Store) => {
  const router = useRouter()
  const params = useParams()

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
        trpcContext.store.fetchStoreById.invalidate(store ? store.id : "")
        trpcContext.store.fetchAllUserStores.invalidate()
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
    // console.log(values, userId)
    if (!userId) return
    if (store) {
      mutateUpdateStore({ values: { ...values, userId }, storeId: store.id })
      return
    }
    mutate({ ...values, userId })
  }

  return { form, isPending, mutate, onSubmit, updateIsPending }
}

export default useMutateStore
