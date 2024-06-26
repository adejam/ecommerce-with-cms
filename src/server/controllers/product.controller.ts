import { ecomCmsProductImages, ecomCmsProducts } from "../../../drizzle/schema"
import { db } from "../db"
import { and, eq } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { fetchStoreById } from "./store.controller"
import { currentDate } from "@/lib/utils"

export const fetchProducts = async (storeId: string) => {
  if (!storeId) throw new Error("Bad request.")
  return await db.query.ecomCmsProducts.findMany({
    where: (ecomCmsProducts, { eq }) =>
      and(eq(ecomCmsProducts.storeId, storeId)),
    orderBy: (ecomCmsProducts, { desc }) => [desc(ecomCmsProducts.createdAt)],
    with: {
      size: true,
      color: true,
      category: true,
    },
  })
}

export const fetchProduct = async (storeId: string, productId: string) => {
  if (!storeId || !productId) throw new Error("Bad request.")
  return await db.query.ecomCmsProducts.findFirst({
    where: (ecomCmsProducts, { eq }) =>
      and(
        eq(ecomCmsProducts.storeId, storeId),
        eq(ecomCmsProducts.id, productId)
      ),
    orderBy: (ecomCmsProducts, { desc }) => [desc(ecomCmsProducts.createdAt)],
    with: {
      images: true,
    },
  })
}

export const fetchFeaturedProducts = async (storeId: string) => {
  if (!storeId) throw new Error("Bad request.")
  return await db.query.ecomCmsProducts.findMany({
    where: (ecomCmsProducts, { eq }) =>
      and(
        eq(ecomCmsProducts.storeId, storeId),
        eq(ecomCmsProducts.isFeatured, true),
        eq(ecomCmsProducts.isArchived, false)
      ),
    orderBy: (ecomCmsProducts, { desc }) => [desc(ecomCmsProducts.createdAt)],
    with: {
      size: true,
      color: true,
      category: true,
      images: true,
    },
  })
}

export const fetchProductsByCategory = async (categoryId: string) => {
  if (!categoryId) throw new Error("Bad request.")
  return await db.query.ecomCmsProducts.findMany({
    where: (ecomCmsProducts, { eq }) =>
      and(
        eq(ecomCmsProducts.categoryId, categoryId),
        eq(ecomCmsProducts.isArchived, false)
      ),
    orderBy: (ecomCmsProducts, { desc }) => [desc(ecomCmsProducts.createdAt)],
    with: {
      size: true,
      color: true,
      category: true,
      images: true,
    },
  })
}

interface filterData {
  categoryId: string
  colorId?: string | null
  sizeId?: string | null
}

export const fetchProductsByFilters = async ({
  categoryId,
  sizeId = null,
  colorId = null,
}: filterData) => {
  if (!categoryId) throw new Error("Bad request.")
  const eqq = (eq: any) => {
    if (sizeId && !colorId) {
      return eq(ecomCmsProducts.sizeId, sizeId)
    }

    if (colorId && !sizeId) {
      return eq(ecomCmsProducts.colorId, colorId)
    }

    if (sizeId && colorId) {
      return (
        eq(ecomCmsProducts.colorId, colorId), eq(ecomCmsProducts.sizeId, sizeId)
      )
    }
  }

  return await db.query.ecomCmsProducts.findMany({
    where: (ecomCmsProducts, { eq }) =>
      and(
        eq(ecomCmsProducts.categoryId, categoryId),
        eq(ecomCmsProducts.isArchived, false),
        eqq(eq)
      ),
    orderBy: (ecomCmsProducts, { desc }) => [desc(ecomCmsProducts.createdAt)],
    with: {
      size: true,
      color: true,
      category: true,
      images: true,
    },
  })
}

export const deleteProduct = async (storeId: string, productId: string) => {
  await db
    .delete(ecomCmsProducts)
    .where(
      and(
        eq(ecomCmsProducts.storeId, storeId),
        eq(ecomCmsProducts.id, productId)
      )
    )
}

export const deleteProductImage = async (
  productId: string,
  imageId: string
) => {
  await db
    .delete(ecomCmsProductImages)
    .where(
      and(
        eq(ecomCmsProductImages.productId, productId),
        eq(ecomCmsProductImages.id, imageId)
      )
    )
  return imageId
}

export const insertProductImageSchema = createInsertSchema(ecomCmsProductImages)

export const insertProductSchema = z.object({
  product: createInsertSchema(ecomCmsProducts),
  images: z.array(insertProductImageSchema),
})
export const updateProductSchema = insertProductSchema.partial()

export const createNewProduct = async (
  values: z.infer<typeof insertProductSchema>,
  userId: string
) => {
  const store = await fetchStoreById(values.product.storeId)

  if (!store || store.userId !== userId) throw new Error("Bad request")
  const { product, images } = values

  await db.transaction(async (tx) => {
    await tx
      .insert(ecomCmsProducts)
      .values({ ...product, updatedAt: currentDate() })
      .returning()

    const imgs = images.map((image) => ({ ...image, updatedAt: currentDate() }))

    await tx
      .insert(ecomCmsProductImages)
      .values([...imgs])
      .returning()
  })
}

export const updateProduct = async (
  values: z.infer<typeof updateProductSchema>,
  id: string,
  userId: string
) => {
  if (!values.product?.storeId) throw new Error("Bad request!")

  const store = await fetchStoreById(values?.product.storeId)
  if (!store || store.userId !== userId) throw new Error("Bad request")
  const { product } = values

  await db
    .update(ecomCmsProducts)
    .set({ ...product, updatedAt: currentDate() })
    .where(
      and(eq(ecomCmsProducts.storeId, store.id), eq(ecomCmsProducts.id, id))
    )
}

export const fetchProductData = async (productId: string) => {
  const productsData = await db
    .select({ id: ecomCmsProducts.id })
    .from(ecomCmsProducts)
    .where(eq(ecomCmsProducts.id, productId))
  return productsData[0]
}

export const addProductImages = async (
  values: z.infer<typeof insertProductImageSchema>[],
  productId: string
) => {
  const product = await fetchProductData(productId)

  if (!product) throw new Error("Bad request")

  const imgs = values.map((image) => ({
    ...image,
    productId: product.id,
    updatedAt: currentDate(),
  }))

  const images = await db
    .insert(ecomCmsProductImages)
    .values([...imgs])
    .returning()

  return images
}

export const fetchStorefrontProduct = async (
  storeId: string,
  productId: string
) => {
  if (!storeId || !productId) throw new Error("Bad request.")
  return await db.query.ecomCmsProducts.findFirst({
    where: (ecomCmsProducts, { eq }) =>
      and(
        eq(ecomCmsProducts.storeId, storeId),
        eq(ecomCmsProducts.id, productId)
      ),
    orderBy: (ecomCmsProducts, { desc }) => [desc(ecomCmsProducts.createdAt)],
    with: {
      size: true,
      color: true,
      category: true,
      images: true,
    },
  })
}
