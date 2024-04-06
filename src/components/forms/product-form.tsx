"use client"

import { useState } from "react"
import { Trash, XCircleIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Categories, Colors, Image as ImageType, Product, Sizes } from "@/types"
import useMutateProduct from "@/hooks/use-mutate-product"
import LoadingButton from "../ui/loading-button"
import Image from "next/image"
import { ImageUploader } from "../image-uploader"
import { ConfirmationModal } from "../modals/confirmation-modal"
import { toast } from "sonner"

interface ProductFormProps {
  initialData: Product
  categories: Categories
  colors: Colors
  sizes: Sizes
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  const [open, setOpen] = useState(false)
  const [imageDeleteModalOpen, setImageDeleteModalOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<ImageType | null>(null)

  const {
    form,
    isPending,
    onSubmit,
    updateIsPending,
    deleteIsPending,
    deleteProduct,
    description,
    title,
    buttonText,
    images,
    setImages,
    imageIsLoading,
    deleteProductImage,
    deleteImageIsPending,
    addImageIsPending,
    addProductImages,
  } = useMutateProduct(initialData, initialData?.id)

  const watchedImages = form.watch("images")

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={deleteIsPending}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <>
                    {watchedImages.length > 0 && (
                      <div className="sm:flex space-x-2">
                        {watchedImages.map((img, index) => (
                          <div className="relative h-32 w-32" key={img.url}>
                            <Image
                              alt=""
                              className="rounded "
                              layout="fill"
                              objectFit="cover"
                              src={img.url}
                            />
                            <Button
                              className="absolute right-1 top-1 m-0 h-auto w-auto !rounded-full p-1 text-white shadow-2xl"
                              size={"icon"}
                              variant="destructive"
                              type="button"
                              onClick={() => {
                                if (watchedImages.length > 1) {
                                  setImageToDelete(img)
                                  setImageDeleteModalOpen(true)
                                } else {
                                  toast.error("There must be atleast one image")
                                }
                              }}
                            >
                              <XCircleIcon color="white" size={20} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {watchedImages.length !== 2 && (
                      <div>
                        <ImageUploader
                          images={images}
                          setImages={setImages}
                          maxFilesToUploadAtOnce={2}
                          MAX_TOTAL_FILES={2}
                        />
                        {images.length > 0 && initialData && (
                          <div>
                            <LoadingButton
                              isLoading={addImageIsPending || imageIsLoading}
                              type="button"
                              onClick={addProductImages}
                            >
                              Upload files
                            </LoadingButton>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending || updateIsPending}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending || updateIsPending}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending || updateIsPending}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isPending || updateIsPending}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    defaultValue={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value || ""}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={isPending || updateIsPending}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    defaultValue={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value || ""}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={isPending || updateIsPending}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    defaultValue={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value || ""}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <LoadingButton
            isLoading={isPending || updateIsPending || imageIsLoading}
            className="ml-auto"
            type="submit"
          >
            {buttonText}
          </LoadingButton>
        </form>
      </Form>
      <ConfirmationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteProduct}
        loading={deleteIsPending}
      />
      <ConfirmationModal
        isOpen={imageDeleteModalOpen}
        onClose={() => setImageDeleteModalOpen(false)}
        onConfirm={async () => {
          imageToDelete && (await deleteProductImage(imageToDelete))
          setImageDeleteModalOpen(false)
        }}
        loading={deleteImageIsPending}
      />
    </>
  )
}
