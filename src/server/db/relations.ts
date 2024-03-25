import { relations } from "drizzle-orm"
import {
  ecomCmsBillBoards,
  ecomCmsCategories,
  ecomCmsProducts,
  ecomCmsSizes,
  ecomCmsStores,
} from "drizzle/schema"

export const ecomCmsStoresRelations = relations(ecomCmsStores, ({ many }) => ({
  billboards: many(ecomCmsBillBoards),
  categories: many(ecomCmsCategories),
}))

export const ecomCmsBillboardsRelations = relations(
  ecomCmsBillBoards,
  ({ many, one }) => ({
    store: one(ecomCmsStores, {
      fields: [ecomCmsBillBoards.storeId],
      references: [ecomCmsStores.id],
    }),
    categories: many(ecomCmsCategories),
  })
)

export const ecomCmsCategoriesRelations = relations(
  ecomCmsCategories,
  ({ many, one }) => ({
    store: one(ecomCmsStores, {
      fields: [ecomCmsCategories.storeId],
      references: [ecomCmsStores.id],
    }),
    billboard: one(ecomCmsBillBoards, {
      fields: [ecomCmsCategories.billboardId],
      references: [ecomCmsBillBoards.id],
    }),
    products: many(ecomCmsProducts),
  })
)

export const ecomCmsSizesRelations = relations(
  ecomCmsSizes,
  ({ many, one }) => ({
    store: one(ecomCmsStores, {
      fields: [ecomCmsSizes.storeId],
      references: [ecomCmsStores.id],
    }),
    products: many(ecomCmsProducts),
  })
)
