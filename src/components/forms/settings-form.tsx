import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import MutateStoreForm from "./mutate-store-form"
import { Store } from "@/types"

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
        {/* <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button> */}
      </div>
      <Separator />
      <MutateStoreForm userId={userId} initialData={initialData} />
    </div>
  )
}
