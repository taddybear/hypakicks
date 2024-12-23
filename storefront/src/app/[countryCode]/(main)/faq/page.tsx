import Aboutus from "@modules/about-us"
import Faq from "@modules/faq"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Hypa Kicks",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default function FAQ() {
  return <Faq />
}
