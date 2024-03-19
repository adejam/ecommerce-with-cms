import { trpc } from "@/trpc/react"
import { storeSchema } from "@/validation-schemas/store.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

export type StoreFormValues = z.infer<typeof storeSchema>

const useMutateStore = (userId: string) => {
  const router = useRouter()
  const { isPending, mutate } = trpc.store.createNewStore.useMutation({
    onSuccess: async (data) => {
      toast.success("Store successfully created")
      if (data) router.push(`/${data?.id}/admin`)
    },
    onError: () => {
      toast.error("An error occured")
    },
  })

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  })

  function onSubmit(values: StoreFormValues) {
    if (userId) mutate({ ...values, userId })
  }

  return { form, isPending, mutate, onSubmit }
}

export default useMutateStore
