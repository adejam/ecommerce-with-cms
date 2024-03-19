-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('expired', 'invalid', 'valid', 'default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal3', 'aal2', 'aal1');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('plain', 's256');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('verified', 'unverified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('webauthn', 'totp');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"migration" varchar(255) NOT NULL,
	"batch" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecom_cms_bill_boards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"store_id" uuid NOT NULL,
	"label" text NOT NULL,
	"image_url" text,
	"created_at" timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(0) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "personal_access_tokens" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"tokenable_type" varchar(255) NOT NULL,
	"tokenable_id" bigint NOT NULL,
	"name" varchar(255) NOT NULL,
	"token" varchar(64) NOT NULL,
	"abilities" text,
	"last_used_at" timestamp(0),
	"expires_at" timestamp(0),
	"created_at" timestamp(0),
	"updated_at" timestamp(0),
	CONSTRAINT "personal_access_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecom_cms_stores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"cover image" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(0) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecom_cms_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(0) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecom_cms_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"available_quantity" integer NOT NULL,
	"price" numeric(8, 2) NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(0) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecom_cms_colors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(0) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecom_cms_sizes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(0) with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecom_cms_product_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(0) with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "personal_access_tokens_tokenable_type_tokenable_id_index" ON "personal_access_tokens" ("tokenable_type","tokenable_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ecom_cms_bill_boards" ADD CONSTRAINT "ecom_cms_bill_boards_store_id_foreign" FOREIGN KEY ("store_id") REFERENCES "public"."ecom_cms_stores"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ecom_cms_stores" ADD CONSTRAINT "ecom_cms_stores_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/