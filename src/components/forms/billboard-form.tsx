"use client"

import { Trash } from "lucide-react"

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
import { useEffect } from "react"

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
  } = useMutateBillboard(initialData)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {/* {initialData && (
          <Button
            disabled={deleteIsPending}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )} */}
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
              <FormItem className="hidden">
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  {/* <ImageUpload 
                      value={field.value ? [field.value] : []} 
                      disabled={isPending || updateIsPending}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    /> */}
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Background image</FormLabel>
            <ImageUploader
              images={images}
              // setError,
              setImages={setImages}
              maxFilesToUploadAtOnce={1}
              MAX_TOTAL_FILES={1}
            />
          </div>

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
    </>
  )
}
