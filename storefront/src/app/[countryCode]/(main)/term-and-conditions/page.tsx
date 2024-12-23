import TermAndConditions from "@modules/term-and-conditions"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Term & conditions - Hypa Kicks",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default function TermConditionsPage() {
  return <TermAndConditions />
}
