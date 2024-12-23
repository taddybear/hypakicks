import { Heading } from "@medusajs/ui"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import MobileCheckoutSummary from "@modules/checkout/components/mobile-checkout-summary"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="w-full sticky top-0 p-5 pb-2 lg:p-8 lg:pr-16 bg-[#eee]">
      <MobileCheckoutSummary cart={cart} />
      <div className="hidden w-full lg:flex flex-col ">
        <ItemsPreviewTemplate cart={cart} />
        <DiscountCode cart={cart} />
        <CartTotals totals={cart} />
      </div>
    </div>
  )
}

export default CheckoutSummary
