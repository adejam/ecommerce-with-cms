import { create } from "zustand"
import { toast } from "sonner"
import { persist, createJSONStorage } from "zustand/middleware"

import { StorefrontProduct } from "@/types"

interface CartStore {
  items: StorefrontProduct[]
  addItem: (data: StorefrontProduct) => void
  removeItem: (id: string) => void
  removeStoreCartItems: (storeId: string) => void
  removeAll: () => void
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: StorefrontProduct) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item?.id === data?.id)

        if (existingItem) {
          return toast("Item already in cart.")
        }

        set({ items: [...get().items, data] })
        toast.success("Item added to cart.")
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item?.id !== id)] })
        toast.success("Item removed from cart.")
      },
      removeAll: () => set({ items: [] }),
      removeStoreCartItems: (storeId: string) => {
        set({
          items: [...get().items.filter((item) => item?.storeId !== storeId)],
        })
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCart
