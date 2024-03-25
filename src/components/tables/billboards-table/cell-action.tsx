"use client"

// import axios from "axios";
import { useState } from "react"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
// import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { BillboardColumn } from "./columns"
import { ConfirmationModal } from "@/components/modals/confirmation-modal"
import useMutateBillboard from "@/hooks/use-mutate-billboard"
import { trpc } from "@/trpc/react"

interface CellActionProps {
  data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  const [open, setOpen] = useState(false)
  const trpcContext = trpc.useUtils()
  const billboard = trpcContext.billboard.fetchBillboards
    .getData(params.store_id! as string)
    ?.find((billboard) => billboard.id === data.id)
  // console.log(billboard)
  const { deleteBillboard, deleteIsPending } = useMutateBillboard(billboard)

  return (
    <>
      <ConfirmationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteBillboard}
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
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.store_id}/admin/billboards/${data.id}`)
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
