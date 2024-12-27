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
  if (
    currentUrl === "https://insightful-forgiveness-production.up.railway.app/us"
  ) {
    redirect(`http://localhost:8000/us/checkout?cart-id=${cartId}`)
  }

  console.log("cartid outside", cartId)
  if (cartId) {
    console.log("cartid inside", cartId)
    setCartId(cartId)
  }

  const cart = await retrieveCart()
  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()
  // console.log("cartss", cart)
  return (
    <>
      <div className="flex flex-col-reverse lg:flex lg:flex-row">
        <div className="px-3 lg:pr-10 lg:w-[54%]">
          <PaymentWrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </PaymentWrapper>
        </div>
        <div className="lg:w-[46%] bg-[#eee]">
          <CheckoutSummary cart={cart} />
        </div>
      </div>
    </>
  )
}
