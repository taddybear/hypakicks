"use client"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import { useState } from "react"

const MobileCheckoutSummary = ({ cart }: { cart: any }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <>
      <div className="flex flex-col lg:hidden">
        {/* Dropdown Header */}
        <div
          className="flex justify-between items-center cursor-pointer px-3 py-4 "
          onClick={toggleDropdown}
        >
          <div className="flex items-center space-x-2">
            <p>Order summary</p>
            <svg
              width={15}
              height={15}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              focusable="false"
              aria-hidden="true"
              className={`transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.9 5.6-4.653 4.653a.35.35 0 0 1-.495 0L2.1 5.6"
              ></path>
            </svg>
          </div>
          <span
            className="txt-xlarge-plus Poppins600"
            data-testid="cart-total"
            data-value={cart.total || 0}
          >
            {convertToLocale({
              amount: cart.total ?? 0,
              currency_code: cart.currency_code,
            })}
          </span>
        </div>

        {/* Dropdown Content */}
        <div
          className={`px-3 space-y-2 overflow-hidden transition-all duration-1000 ease-in-out ${
            isDropdownOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          {isDropdownOpen && (
            <>
              <ItemsPreviewTemplate cart={cart} className="bg-[#eee]" />
              <DiscountCode cart={cart} />
              <CartTotals totals={cart} shippingMethods={null} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MobileCheckoutSummary
