import useMutateStore from "@/hooks/use-mutate-store"
import { type Store } from "@/types"
import React from "react"
import { Input } from "../ui/input"
import LoadingButton from "../ui/loading-button"

type Props = {
  closeButton?: React.ReactNode
  initialData: Store
}

const DeleteStoreForm = ({ closeButton = <></>, initialData }: Props) => {
  const { nameValue, setNameValue, deleteIsPending, deleteStore } =
    useMutateStore("", initialData)

  return (
    <div>
      <Input
        placeholder="Enter Store name"
        disabled={deleteIsPending}
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        {closeButton}

        <LoadingButton
          isLoading={deleteIsPending}
          disabled={initialData?.name !== nameValue || deleteIsPending}
          type="button"
          variant={"destructive"}
          onClick={deleteStore}
        >
          Delete
        </LoadingButton>
      </div>
    </div>
  )
}

export default DeleteStoreForm
