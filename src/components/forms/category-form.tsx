"use client"

import React, { useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Billboards, Category } from "@/types"
import useMutateCategory from "@/hooks/use-mutate-category"
import { ConfirmationModal } from "../modals/confirmation-modal"
import LoadingButton from "../ui/loading-button"

interface CategoryFormProps {
  initialData: Category
  billboardsData: Billboards
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboardsData,
}) => {
  const [open, setOpen] = useState(false)

  const {
    form,
    isPending,
    onSubmit,
    updateIsPending,
    deleteIsPending,
    deleteCategory,
    description,
    title,
    buttonText,
    billboards,
  } = useMutateCategory(billboardsData, initialData)

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
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={isPending || updateIsPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards &&
                        billboards.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
        loading={deleteIsPending}
        onConfirm={deleteCategory}
      />
    </>
  )
}
