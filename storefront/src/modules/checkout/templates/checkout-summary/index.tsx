import { Heading } from "@medusajs/ui"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import MobileCheckoutSummary from "@modules/checkout/components/mobile-checkout-summary"
import { HttpTypes } from "@medusajs/types"

const CheckoutSummary = ({
  cart,
  shippingMethods,
}: {
  cart: any
  shippingMethods: HttpTypes.StoreCartShippingOption[] | null
}) => {
  return (
    <div className="w-full sticky h-full top-0 lg:px-9 lg:py-0 lg:w-[70%]">
      <MobileCheckoutSummary cart={cart} />
      <div className="hidden w-full lg:flex flex-col sticky top-0 py-9">
        <ItemsPreviewTemplate cart={cart} className="bg-[#eee]" />
        <DiscountCode cart={cart} />
        <CartTotals totals={cart} shippingMethods={shippingMethods} />
      </div>
    </div>
  )
}

export default CheckoutSummary
