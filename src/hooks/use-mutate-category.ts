import { categorySchema } from "./../validation-schemas/category.schema"
import { trpc } from "@/trpc/react"
import { Billboards, Category } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

export type CategoryFormValues = z.infer<typeof categorySchema>

const useMutateCategory = (
  billboardsData?: Billboards,
  initialData?: Category
) => {
  const router = useRouter()
  const params = useParams()
  const storeId = params.store_id! as string
  const categoryId = params.categoryId! as string
  const title = initialData ? "Edit category" : "Create category"
  const description = initialData ? "Edit a category." : "Add a new category"
  const toastMessage = initialData ? "Category updated." : "Category created."
  const buttonText = initialData ? "Save changes" : "Create"

  const { data: category } = trpc.category.fetchCategory.useQuery(
    { storeId, categoryId },
    {
      initialData,
    }
  )

  const { data: billboards } = trpc.billboard.fetchBillboards.useQuery(
    storeId,
    {
      initialData: billboardsData,
    }
  )

  const trpcContext = trpc.useUtils()
  const { isPending, mutate } = trpc.category.createNewCategory.useMutation({
    onSuccess: async () => {
      toast.success(toastMessage)
      await trpcContext.category.fetchCategories.invalidate(storeId)
      router.push(`/${storeId}/admin/categories`)
    },
    onError: () => {
      toast.error("An error occured")
    },
  })

  const { isPending: updateIsPending, mutate: mutateUpdateCategory } =
    trpc.category.updateCategory.useMutation({
      onSuccess: async () => {
        toast.success(toastMessage)
        await trpcContext.category.fetchCategory.invalidate({
          storeId,
          categoryId,
        })
        await trpcContext.category.fetchCategories.invalidate(storeId)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: category || {
      name: "",
      billboardId: "",
    },
    mode: "onChange",
  })

  async function onSubmit(values: CategoryFormValues) {
    if (!params.store_id) return
    if (category) {
      mutateUpdateCategory({
        values: { ...values, storeId },
        id: categoryId,
      })
      return
    }
    mutate({
      ...values,
      storeId,
    })
  }

  const { isPending: deleteIsPending, mutate: deleteCategoryMutationFunc } =
    trpc.category.deleteCategory.useMutation({
      onSuccess: async () => {
        toast.success("Category successfully deleted")
        await trpcContext.category.fetchCategories.invalidate(storeId)
        router.push(`/${storeId}/admin/categories`)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const deleteCategory = async () => {
    if (category) {
      deleteCategoryMutationFunc({ storeId, categoryId: category.id })
    }
  }

  return {
    form,
    isPending,
    mutate,
    onSubmit,
    updateIsPending,
    deleteIsPending,
    deleteCategory,
    description,
    title,
    buttonText,
    billboards,
  }
}

export default useMutateCategory
