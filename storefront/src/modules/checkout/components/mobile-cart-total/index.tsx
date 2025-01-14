import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import { convertToLocale } from "@lib/util/money"

const MobileCartTotal = ({ cart }: { cart: any }) => {
  const currency_code = cart.currency_code
  return (
    <div className="lg:hidden">
      <h1 className="text-[1.313rem] Poppins600 mt-6 my-4">Order summary</h1>

      <ItemsPreviewTemplate cart={cart} className="bg-white hover:bg-white" />
      {/* <DiscountCode cart={cart} /> */}
      <div className="mt-4">
        {/* <CartTotals totals={cart} /> */}
        <div className="flex items-center justify-between mb-2 text-[1.188rem] Poppins600">
          <span className="Poppins600">Total</span>
          <div>
            <span className="Poppins400 text-xs uppercase mr-1">
              {currency_code}
            </span>
            <span
              className="txt-xlarge-plus Poppins600"
              data-testid="cart-total"
              data-value={cart.total || 0}
            >
              {convertToLocale({ amount: cart.total ?? 0, currency_code })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileCartTotal
