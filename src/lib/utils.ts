import { type ClassValue, clsx } from "clsx"
import md5 from "md5"
import { twMerge } from "tailwind-merge"
import jsPDF from "jspdf"

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
  folderPath = "billboards",
  bucketName = "ecommerce_assets"
) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucketName}/${folderPath}/${assetName}`

export const getImageNameFromUrl = (
  imageUrl: string,
  bucketName = "ecommerce_assets"
) => {
  return imageUrl.replace(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucketName}/`,
    ""
  )
}

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export const getAvatarUrl = (key: string) =>
  `https://gravatar.com/${md5(key)}?s=400&d=robohash&r=x`

const adjectives = [
  "Happy",
  "Creative",
  "Energetic",
  "Lively",
  "Dynamic",
  "Radiant",
  "Joyful",
  "Vibrant",
  "Cheerful",
  "Sunny",
  "Sparkling",
  "Bright",
  "Shining",
]

const animals = [
  "Dolphin",
  "Tiger",
  "Elephant",
  "Penguin",
  "Kangaroo",
  "Panther",
  "Lion",
  "Cheetah",
  "Giraffe",
  "Hippopotamus",
  "Monkey",
  "Panda",
  "Crocodile",
]

export function generateRandomName(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)]

  return `${randomAdjective} ${randomAnimal}`
}

export const getShapeInfo = (shapeType: string) => {
  switch (shapeType) {
    case "rect":
      return {
        icon: "/assets/figma-clone-assets/rectangle.svg",
        name: "Rectangle",
      }

    case "circle":
      return {
        icon: "/assets/figma-clone-assets/circle.svg",
        name: "Circle",
      }

    case "triangle":
      return {
        icon: "/assets/figma-clone-assets/triangle.svg",
        name: "Triangle",
      }

    case "line":
      return {
        icon: "/assets/figma-clone-assets/line.svg",
        name: "Line",
      }

    case "i-text":
      return {
        icon: "/assets/figma-clone-assets/text.svg",
        name: "Text",
      }

    case "image":
      return {
        icon: "/assets/figma-clone-assets/image.svg",
        name: "Image",
      }

    case "freeform":
      return {
        icon: "/assets/figma-clone-assets/freeform.svg",
        name: "Free Drawing",
      }

    default:
      return {
        icon: "/assets/figma-clone-assets/rectangle.svg",
        name: shapeType,
      }
  }
}

export const exportToPdf = () => {
  const canvas = document.querySelector("canvas")

  if (!canvas) return

  // use jspdf
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  })

  // get the canvas data url
  const data = canvas.toDataURL()

  // add the image to the pdf
  doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height)

  // download the pdf
  doc.save("canvas.pdf")
}
