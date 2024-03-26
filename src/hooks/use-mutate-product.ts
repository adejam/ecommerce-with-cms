import { deleteFile, deleteResourceAssets } from "@/app/actions"
import { computeImageUrl, getImageNameFromUrl } from "@/lib/utils"
import { trpc } from "@/trpc/react"
import { Image, Product } from "@/types"
import { productSchema } from "@/validation-schemas/product.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { v4 } from "uuid"
import * as z from "zod"
import useImageUploader from "./use-image-uploader"

export type ProductFormValues = z.infer<typeof productSchema>

const useMutateProduct = (
  initialData?: Product,
  productIdToDelete?: string
) => {
  const router = useRouter()
  const params = useParams()
  const storeId = params.store_id! as string
  const productId = params.productId! as string
  const title = initialData ? "Edit Product" : "Create Product"
  const description = initialData ? "Edit a product." : "Add a new product"
  const toastMessage = initialData
    ? "Product successfully updated."
    : "Product successfully created."
  const buttonText = initialData ? "Save changes" : "Create"

  const [nameValue, setNameValue] = useState("")
  const {
    handleImageUpload,
    images,
    setImages,
    isLoading: imageIsLoading,
    setImageError,
    imageError,
  } = useImageUploader()

  const { data: product } = trpc.product.fetchProduct.useQuery(
    { storeId, productId },
    {
      initialData,
    }
  )

  const trpcContext = trpc.useUtils()
  const { isPending, mutate } = trpc.product.createNewProduct.useMutation({
    onSuccess: async () => {
      toast.success(toastMessage)
      await trpcContext.product.fetchProducts.invalidate(storeId)
      router.push(`/${storeId}/admin/products`)
    },
    onError: () => {
      toast.error("An error occured")
    },
  })

  const { isPending: updateIsPending, mutate: mutateUpdateProduct } =
    trpc.product.updateProduct.useMutation({
      onSuccess: async () => {
        toast.success(toastMessage)
        await trpcContext.product.fetchProduct.invalidate({
          storeId,
          productId,
        })
        await trpcContext.product.fetchProducts.invalidate(storeId)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          ...product,
          price: parseFloat(String(product?.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: null,
          sizeId: null,
          availableQuantity: 0,
          isFeatured: false,
          isArchived: false,
        },
    mode: "onChange",
  })

  async function onSubmit(values: ProductFormValues) {
    console.log("here")
    if (!params.store_id || !params.productId) return
    if (!product || (product && !values.images.length)) {
      if (!images.length) {
        setImageError("Add an image")
        return
      }
    }

    const { images: imgs, ...productValues } = values

    if (images.length && !product) {
      const data = await handleImageUpload(storeId, "", "products")
      if (data.success && data.images) {
        const id = v4()
        mutate({
          product: {
            ...productValues,
            id,
            price: String(productValues.price),
            storeId,
          },
          images: [
            ...imgs,
            ...data.images.map((img) => ({
              id: v4(),
              productId: id,
              url: computeImageUrl(img.name, "products"),
            })),
          ],
        })
      }
    }
    if (product)
      mutateUpdateProduct({
        values: {
          product: {
            ...productValues,
            price: String(productValues.price),
            storeId,
          },
        },
        id: product.id,
      })
  }

  const { isPending: deleteIsPending, mutate: deleteProductMutationFunc } =
    trpc.product.deleteProduct.useMutation({
      onSuccess: async () => {
        toast.success("Product successfully deleted")
        await trpcContext.product.fetchProducts.invalidate(storeId)
        router.push(`/${storeId}/admin/products`)
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const deleteProduct = async () => {
    if (productIdToDelete) {
      const res = await deleteResourceAssets({
        resource: "ecom_cms_product_images",
        resourceId: productIdToDelete,
        resourceTarget: "product_id",
        assetFieldName: "url",
      })

      if (res?.success) {
        deleteProductMutationFunc({ storeId, productId: productIdToDelete })
      } else {
        toast.error("An error occured, Please try again")
      }
    }
  }

  const {
    isPending: deleteImageIsPending,
    mutate: deleteProductImageMutationFunc,
  } = trpc.product.deleteProductImage.useMutation({
    onSuccess: async (data) => {
      toast.success("Product image successfully deleted")
      await trpcContext.product.fetchProduct.invalidate({
        storeId,
        productId: product?.id || productId,
      })
      form.setValue("images", [
        ...form.getValues().images.filter((img) => img.id !== data),
      ])
    },
    onError: () => {
      toast.error("An error occured")
    },
  })

  const deleteProductImage = async ({ url, id, productId }: Image) => {
    const imageName = getImageNameFromUrl(url)

    const res = await deleteFile(imageName)

    if (res?.success) {
      deleteProductImageMutationFunc({ productId, imageId: id })
    } else {
      toast.error("An error occured, Please try again")
    }
  }

  const { isPending: addImageIsPending, mutate: addProductImageMutationFunc } =
    trpc.product.addProductImages.useMutation({
      onSuccess: async (data) => {
        toast.success("Image successfully added")
        await trpcContext.product.fetchProduct.invalidate({
          storeId,
          productId: product?.id || productId,
        })
        form.setValue("images", [...form.getValues().images, ...data])
        setImages([])
      },
      onError: () => {
        toast.error("An error occured")
      },
    })

  const addProductImages = async () => {
    if (product) {
      const data = await handleImageUpload(storeId, "", "products")

      if (data.success && data.images) {
        const newImages = [
          ...data.images.map((img) => ({
            id: v4(),
            productId: product.id,
            url: computeImageUrl(img.name, "products"),
          })),
        ]

        addProductImageMutationFunc({
          values: [...newImages],
          id: product.id,
        })
      }
    }
  }

  return {
    addImageIsPending,
    addProductImages,
    deleteProductImage,
    deleteImageIsPending,
    form,
    isPending,
    mutate,
    onSubmit,
    updateIsPending,
    nameValue,
    setNameValue,
    deleteIsPending,
    deleteProduct,
    description,
    title,
    buttonText,
    images,
    setImages,
    imageError,
    imageIsLoading,
  }
}

export default useMutateProduct
