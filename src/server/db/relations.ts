import { relations } from "drizzle-orm"
import {
  ecomCmsBillBoards,
  ecomCmsCategories,
  ecomCmsColors,
  ecomCmsProductImages,
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

export const ecomCmsColorsRelations = relations(
  ecomCmsColors,
  ({ many, one }) => ({
    store: one(ecomCmsStores, {
      fields: [ecomCmsColors.storeId],
      references: [ecomCmsStores.id],
    }),
    products: many(ecomCmsProducts),
  })
)

export const ecomCmsProductsRelations = relations(
  ecomCmsProducts,
  ({ many, one }) => ({
    store: one(ecomCmsStores, {
      fields: [ecomCmsProducts.storeId],
      references: [ecomCmsStores.id],
    }),
    size: one(ecomCmsSizes, {
      fields: [ecomCmsProducts.sizeId],
      references: [ecomCmsSizes.id],
    }),
    color: one(ecomCmsColors, {
      fields: [ecomCmsProducts.colorId],
      references: [ecomCmsColors.id],
    }),
    category: one(ecomCmsCategories, {
      fields: [ecomCmsProducts.categoryId],
      references: [ecomCmsCategories.id],
    }),
    images: many(ecomCmsProductImages),
  })
)

export const ecomCmsProductImagessRelations = relations(
  ecomCmsProductImages,
  ({ one }) => ({
    product: one(ecomCmsProducts, {
      fields: [ecomCmsProductImages.productId],
      references: [ecomCmsProducts.id],
    }),
  })
)
