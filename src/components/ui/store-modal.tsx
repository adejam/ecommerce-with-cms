"use client"

import Link from "next/link"
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
import MutateStoreForm from "../forms/mutate-store-form"
import { Button } from "./button"

type Props = {
  children: React.ReactNode
  userId: string
}

const StoreModal = ({ children, userId }: Props) => {
  const [isMounted, setIsMounted] = useState(false)

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
        <MutateStoreForm
          closeButton={
            <DialogClose>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
          }
          userId={userId}
        />
      </DialogContent>
    </Dialog>
  )
}

export default StoreModal
