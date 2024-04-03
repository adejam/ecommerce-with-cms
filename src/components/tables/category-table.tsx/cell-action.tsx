"use client"

import { useState } from "react"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CategoryColumn } from "./columns"
import { toast } from "sonner"
import { ConfirmationModal } from "@/components/modals/confirmation-modal"
import { trpc } from "@/trpc/react"
import useMutateCategory from "@/hooks/use-mutate-category"

interface CellActionProps {
  data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  const [open, setOpen] = useState(false)
  const trpcContext = trpc.useUtils()
  const category = trpcContext.category.fetchCategories
    .getData(params.store_id! as string)
    ?.find((category) => category.id === data.id)
  const { deleteCategory, deleteIsPending } = useMutateCategory(
    undefined,
    category
  )

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id)
    toast.success("Category ID copied to clipboard.")
  }

  return (
    <>
      <ConfirmationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteCategory}
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
                `/${params.store_id as string}/admin/categories/${data.id}`
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
