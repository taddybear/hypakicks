import Aboutus from "@modules/about-us"
import OrdersTracking from "@modules/orders-tracking"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Tracking - Hypa Kicks",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default function OrderTracking() {
  return <OrdersTracking />
}
