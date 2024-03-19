"use client"

import React from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import LoadingButton from "../ui/loading-button"
import useMutateStore from "@/hooks/use-mutate-store"
import { Store } from "@/types"

type Props = {
  closeButton?: React.ReactNode
  userId: string
  initialData?: Store
}

const MutateStoreForm = ({
  closeButton = <></>,
  userId,
  initialData,
}: Props) => {
  const { form, isPending, onSubmit, updateIsPending } = useMutateStore(
    userId,
    initialData
  )

  return (
    <div>
      <div className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending || updateIsPending}
                        placeholder="Store name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                {closeButton}

                <LoadingButton
                  isLoading={isPending || updateIsPending}
                  disabled={isPending || updateIsPending}
                  type="submit"
                >
                  Submit
                </LoadingButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default MutateStoreForm
