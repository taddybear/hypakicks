import Aboutus from "@modules/about-us"
import Contactus from "@modules/contatc-us"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Hypa Kicks",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default function ContactUs() {
  return <Contactus />
}
