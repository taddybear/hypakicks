import Aboutus from "@modules/about-us"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Hypa Kicks",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default function AboutUs() {
  return <Aboutus />
}
