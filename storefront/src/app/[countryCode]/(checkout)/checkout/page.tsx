import { retrieveCart, setRedirectCartId } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import RedirectComponent from "@modules/checkout/components/redirect-component"
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
  const params = await searchParams
  const cartId = params.cart_id

  const cart = await retrieveCart(Array.isArray(cartId) ? cartId[0] : cartId)

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()
  const shippingMethods = await listCartShippingMethods(cart.id)

  return (
    <>
      <RedirectComponent cartId={cartId} />
      <div className="flex flex-col-reverse lg:flex lg:flex-row">
        <div className="px-3 lg:pr-10 lg:w-[54%]">
          <PaymentWrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </PaymentWrapper>
        </div>
        <div className="lg:w-[46%] bg-[#eee]">
          <CheckoutSummary cart={cart} shippingMethods={shippingMethods} />
        </div>
      </div>
    </>
  )
}
