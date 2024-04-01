import {
  pgTable,
  index,
  unique,
  pgEnum,
  bigserial,
  varchar,
  bigint,
  text,
  timestamp,
  serial,
  integer,
  foreignKey,
  uuid,
  numeric,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", [
  "expired",
  "invalid",
  "valid",
  "default",
])
export const keyType = pgEnum("key_type", [
  "stream_xchacha20",
  "secretstream",
  "secretbox",
  "kdf",
  "generichash",
  "shorthash",
  "auth",
  "hmacsha256",
  "hmacsha512",
  "aead-det",
  "aead-ietf",
])
export const aalLevel = pgEnum("aal_level", ["aal3", "aal2", "aal1"])
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "plain",
  "s256",
])
export const factorStatus = pgEnum("factor_status", ["verified", "unverified"])
export const factorType = pgEnum("factor_type", ["webauthn", "totp"])

export const personalAccessTokens = pgTable(
  "personal_access_tokens",
  {
    id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
    tokenableType: varchar("tokenable_type", { length: 255 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    tokenableId: bigint("tokenable_id", { mode: "number" }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    token: varchar("token", { length: 64 }).notNull(),
    abilities: text("abilities"),
    lastUsedAt: timestamp("last_used_at", { mode: "string" }),
    expiresAt: timestamp("expires_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" }),
    updatedAt: timestamp("updated_at", { mode: "string" }),
  },
  (table) => {
    return {
      tokenableTypeTokenableIdIdx: index().on(
        table.tokenableType,
        table.tokenableId
      ),
      personalAccessTokensTokenUnique: unique(
        "personal_access_tokens_token_unique"
      ).on(table.token),
    }
  }
)

export const migrations = pgTable("migrations", {
  id: serial("id").primaryKey().notNull(),
  migration: varchar("migration", { length: 255 }).notNull(),
  batch: integer("batch").notNull(),
})

export const ecomCmsStores = pgTable("ecom_cms_stores", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  userId: uuid("user_id").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
})

export const ecomCmsBillBoards = pgTable("ecom_cms_bill_boards", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => ecomCmsStores.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
})

export const ecomCmsCategories = pgTable("ecom_cms_categories", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => ecomCmsStores.id, { onDelete: "cascade" }),
  billboardId: uuid("billboard_id")
    .notNull()
    .references(() => ecomCmsBillBoards.id),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
})

export const ecomCmsProducts = pgTable("ecom_cms_products", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => ecomCmsStores.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").references(() => ecomCmsCategories.id, {
    onDelete: "set null",
  }),
  sizeId: uuid("size_id").references(() => ecomCmsSizes.id, {
    onDelete: "set null",
  }),
  colorId: uuid("color_id").references(() => ecomCmsColors.id, {
    onDelete: "set null",
  }),
  name: text("name").notNull(),
  availableQuantity: integer("available_quantity").notNull(),
  price: numeric("price", { precision: 8, scale: 2 }).notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isArchived: boolean("is_archived").default(false).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
})

export const ecomCmsSizes = pgTable("ecom_cms_sizes", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => ecomCmsStores.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  value: text("value").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
})

export const ecomCmsColors = pgTable("ecom_cms_colors", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => ecomCmsStores.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  value: text("value").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
})

export const ecomCmsProductImages = pgTable("ecom_cms_product_images", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => ecomCmsProducts.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
})

export const ecomCmsOrders = pgTable("ecom_cms_orders", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  buyerId: uuid("buyer_id"),
  storeId: uuid("store_id")
    .notNull()
    .references(() => ecomCmsStores.id),
  isPaid: boolean("is_paid").default(false).notNull(),
  phone: text("phone"),
  address: text("address"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  buyerEmail: text("buyer_email"),
})

export const ecomCmsOrderItems = pgTable("ecom_cms_order_items", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => ecomCmsOrders.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => ecomCmsProducts.id),
  name: text("name").notNull(),
  price: numeric("price", { precision: 8, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
  attributes: jsonb("attributes"),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
})
