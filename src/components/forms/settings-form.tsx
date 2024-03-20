import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import MutateStoreForm from "./mutate-store-form"
import { type Store } from "@/types"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import DeleteStoreModal from "../modals/delete-store-modal"

interface SettingsFormProps {
  initialData: Store
  userId: string
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
  userId,
}) => {
  return (
    <div className="max-w-[700px]">
      <div className="flex items-center justify-between">
        <Heading
          title="Store settings"
          description="Manage store preferences"
        />
      </div>
      <Separator />
      <MutateStoreForm userId={userId} initialData={initialData} />
      <Separator className="mt-6" />
      <div className="flex items-center justify-between mt-2">
        <Heading
          title="Delete store"
          description="Delete store. This action is irrevocable."
        />
        <DeleteStoreModal initialData={initialData}>
          <Button variant="destructive" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        </DeleteStoreModal>
      </div>
    </div>
  )
}
