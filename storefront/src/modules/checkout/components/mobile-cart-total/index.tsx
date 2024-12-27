import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const MobileCartTotal = ({ cart }: { cart: any }) => {
  return (
    <div className="lg:hidden">
      <h1 className="text-[1.313rem] Poppins600 mt-6 my-4">Order summary</h1>

      <ItemsPreviewTemplate cart={cart} className="" />
      <DiscountCode cart={cart} />
      <CartTotals totals={cart} />
    </div>
  )
}

export default MobileCartTotal
