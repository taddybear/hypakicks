import { retrieveCart } from "@lib/data/cart"
import { setCartId } from "@lib/data/cookies"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"
// import CheckoutWrapper from "./CheckoutWrapper"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout - Hypa Kicks",
}

interface CheckoutProps {
  searchParams: { [key: string]: string | undefined }
}

export default async function Checkout({ searchParams }: CheckoutProps) {
  const requestHeaders = headers()
  const host = (await requestHeaders).get("host")
  const proto = (await requestHeaders).get("x-forwarded-proto") || "http"

  const currentUrl = `${proto}://${host}`

  // if (currentUrl === "https://hypakicks") {
  //   redirect(`https://hypa-kicks/checkout?step=address`)
  // }
  const cartId = searchParams["cart-id"] || null
  console.log("currentUrl", currentUrl)
  if (currentUrl === "http://localhost:8000") {
    redirect(
      `https://insightful-forgiveness-production.up.railway.app/us/checkout?${cartId}`
    )
  }

  if (cartId) {
    console.log("cartid", cartId)
    setCartId(cartId)
  }

  const cart = await retrieveCart()
  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <>
      <div className="flex flex-col-reverse lg:flex lg:flex-row">
        <div className="px-3 lg:w-[55%]">
          <PaymentWrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </PaymentWrapper>
        </div>
        <div className="lg:w-[45%]">
          <CheckoutSummary cart={cart} />
        </div>
      </div>
    </>
  )
}
