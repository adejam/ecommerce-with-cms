"use client"

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ProductColumn } from "./columns"
import { toast } from "sonner"
import { ConfirmationModal } from "@/components/modals/confirmation-modal"
import useMutateProduct from "@/hooks/use-mutate-product"

interface CellActionProps {
  data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams()

  const { deleteIsPending, deleteProduct } = useMutateProduct(
    undefined,
    data.id
  )

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id)
    toast.success("Product ID copied to clipboard.")
  }

  return (
    <>
      <ConfirmationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteProduct}
        loading={deleteIsPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/${params.store_id as string}/admin/products/${data.id}`
              )
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
