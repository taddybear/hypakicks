import Aboutus from "@modules/about-us"
import PrivacyPolicy from "@modules/privacy-policy"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Hypa Kicks",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default function PricayPolicyPage() {
  return <PrivacyPolicy />
}
