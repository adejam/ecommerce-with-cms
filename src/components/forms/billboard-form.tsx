"use client"

import { Trash, XCircleIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { Billboard } from "@/types"
import useMutateBillboard from "@/hooks/use-mutate-billboard"
import { ImageUploader } from "../image-uploader"
import LoadingButton from "../ui/loading-button"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ConfirmationModal } from "../modals/confirmation-modal"

interface BillboardFormProps {
  initialData: Billboard
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const {
    title,
    description,
    images,
    setImages,
    imageError,
    deleteIsPending,
    form,
    onSubmit,
    isPending,
    updateIsPending,
    buttonText,
    imageIsLoading,
    deleteBillboard,
  } = useMutateBillboard(initialData)

  const watchedImageUrl = form.watch("imageUrl")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={deleteIsPending}
            variant="destructive"
            size="sm"
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        {imageError && <p className="text-sm text-red-500">{imageError}</p>}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="max-w-[400px]">
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <>
                    {watchedImageUrl && (
                      <div className="relative h-32 w-32">
                        <Image
                          alt=""
                          className="rounded "
                          layout="fill"
                          objectFit="cover"
                          src={watchedImageUrl}
                        />
                        <Button
                          className="absolute right-1 top-1 m-0 h-auto w-auto !rounded-full p-1 text-white shadow-2xl"
                          size={"icon"}
                          variant="destructive"
                          onClick={() => {
                            form.setValue("imageUrl", null)
                          }}
                        >
                          <XCircleIcon color="white" size={20} />
                        </Button>
                      </div>
                    )}
                    {!watchedImageUrl && (
                      <div>
                        <ImageUploader
                          images={images}
                          setImages={setImages}
                          maxFilesToUploadAtOnce={1}
                          MAX_TOTAL_FILES={1}
                        />
                      </div>
                    )}
                    <Input type="hidden" {...field} />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending || updateIsPending}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={deleteIsPending}
        onConfirm={deleteBillboard}
      />
    </>
  )
}
