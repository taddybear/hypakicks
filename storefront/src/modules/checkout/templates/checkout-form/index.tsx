import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import ExpressCheckout from "@modules/checkout/components/express-checkout"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="lg:w-[75%] lg:ml-auto py-10">
      <ExpressCheckout cart={cart} />

      <Addresses
        cart={cart}
        customer={customer}
        availableShippingMethods={shippingMethods}
        availablePaymentMethods={paymentMethods}
      />

      {/* <Shipping cart={cart} availableShippingMethods={shippingMethods} /> */}

      {/* <Payment cart={cart} availablePaymentMethods={paymentMethods} /> */}

      {/* <Review cart={cart} /> */}
      <p className="mt-16 pt-4 border-t-[#eee] border-t-2 text-sm">
        <a
          href="/term-and-conditions"
          className="text-[#161d25] Poppins400 px-1 underline"
        >
          Terms & Conditions
        </a>

        <a
          href="/privacy-policy"
          className="text-[#161d25] Poppins400 px-1 underline"
        >
          Privacy Policy.
        </a>
      </p>
    </div>
  )
}
