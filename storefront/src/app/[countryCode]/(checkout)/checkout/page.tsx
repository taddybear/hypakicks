import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout - Hypa Kicks",
}

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const cartId = (await searchParams).cart_id

  if (cartId) {
    await fetch("/api/cart-id?cart_id=" + cartId)
  }

  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

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
