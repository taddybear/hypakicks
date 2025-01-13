import RequestResetPassword from "@modules/reset-password"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password - Hypa Kicks",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default function ResetPasswordPage() {
  return <RequestResetPassword />
}
