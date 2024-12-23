import Aboutus from "@modules/about-us"
import ShippingAndDelivery from "@modules/shipping-and-delivery"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping & Delivery - Hypa Kicks",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default function ShippingDelivery() {
  return <ShippingAndDelivery />
}
