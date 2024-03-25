"use client"

import { useState } from "react"
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
import useMutateColor from "@/hooks/use-mutate-Color"
import LoadingButton from "../ui/loading-button"
import { ConfirmationModal } from "../modals/confirmation-modal"
import { Color } from "@/types"

interface ColorFormProps {
  initialData: Color
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)

  const {
    form,
    isPending,
    onSubmit,
    updateIsPending,
    deleteIsPending,
    deleteColor,
    description,
    title,
    buttonText,
  } = useMutateColor(initialData)

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
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={isPending || updateIsPending}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton
            isLoading={isPending || updateIsPending}
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
        onConfirm={deleteColor}
        loading={deleteIsPending}
      />
    </>
  )
}
