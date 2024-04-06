import { create } from "zustand"

import { type StorefrontProduct } from "@/types"

interface PreviewModalStore {
  isOpen: boolean
  data?: StorefrontProduct
  onOpen: (data: StorefrontProduct) => void
  onClose: () => void
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: StorefrontProduct) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}))

export default usePreviewModal
