"use client"

import * as React from "react"
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react"

import { cn, firstCharToUpperCase } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useParams, useRouter } from "next/navigation"
import useUserData from "@/hooks/use-user"
import { Store } from "@/types"
import StoreModal from "../ui/store-modal"
import { trpc } from "@/trpc/react"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const { user } = useUserData()
  const params = useParams()
  const router = useRouter()

  const { data } = trpc.store.fetchAllUserStores.useQuery(undefined, {
    initialData: items,
  })

  const formattedItems = data.map((item) => ({
    label: firstCharToUpperCase(item.name || ""),
    value: item.id,
  }))

  const currentStore = formattedItems.find(
    (item) => item.value === params.store_id
  )

  const [open, setOpen] = React.useState(false)

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false)
    router.push(`/${store.value}/admin`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-full justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[247px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm cursor-pointer"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem className="cursor-pointer">
                <StoreModal userId={user?.id || ""}>
                  <Button variant={"ghost"} size="sm">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Store
                  </Button>
                </StoreModal>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
