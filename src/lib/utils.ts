import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currentDate = () => new Date(Date.now()).toISOString()

export const firstCharToUpperCase = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

export const extractEmailLeft = (email: string): string => {
  const atIndex = email.indexOf("@")
  if (atIndex !== -1) {
    return email.substring(0, atIndex)
  }
  // If '@' is not found, return the original email
  return email
}

export const computeImageUrl = (
  assetName: string,
  bucketName = "ecommerce_assets"
) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucketName}/${assetName}`
