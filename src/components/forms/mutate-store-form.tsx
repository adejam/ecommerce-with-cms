"use client"

import React, { useEffect, useState } from "react"
import * as z from "zod"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { storeSchema } from "@/validation-schemas/store.schema"
import LoadingButton from "../ui/loading-button"
import Link from "next/link"
import useMutateStore from "@/hooks/use-mutate-store"

type Props = {
  children: React.ReactNode
  userId: string
}

export type FormValues = z.infer<typeof storeSchema>

const MutateStoreForm = ({ children, userId }: Props) => {
  const [isMounted, setIsMounted] = useState(false)

  const { form, isPending, mutate, onSubmit } = useMutateStore(userId)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <>{children}</>
  if (!userId) return <Link href="/login">{children}</Link>

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Become a seller</DialogTitle>
          <DialogDescription>
            Create a new store and start selling.
          </DialogDescription>
        </DialogHeader>
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
                            disabled={isPending}
                            placeholder="Store name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <DialogClose>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <LoadingButton
                      isLoading={isPending}
                      disabled={isPending}
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
      </DialogContent>
    </Dialog>
  )
}

export default MutateStoreForm
