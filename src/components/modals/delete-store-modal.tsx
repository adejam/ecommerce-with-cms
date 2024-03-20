"use client"

import React, { useEffect, useState } from "react"
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
import { type Store } from "@/types"
import DeleteStoreForm from "../forms/delete-store-form"

type Props = {
  children: React.ReactNode
  initialData: Store
}

const DeleteStoreModal = ({ children, initialData }: Props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <>{children}</>

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete store</DialogTitle>
          <DialogDescription>
            This action is irreversible. Type{" "}
            <span className="text-red-500">&quot;{initialData.name}&quot;</span>{" "}
            to confirm.
          </DialogDescription>
        </DialogHeader>
        <DeleteStoreForm
          closeButton={
            <DialogClose>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
          }
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DeleteStoreModal
