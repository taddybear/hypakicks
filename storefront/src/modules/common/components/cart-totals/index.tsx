"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"
import { HttpTypes } from "@medusajs/types"

type CartTotalsProps = {
  totals: {
    items: any
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
    shipping_subtotal?: number | null
  }
  shippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals, shippingMethods }) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    discount_total,
    gift_card_total,
    shipping_subtotal,
  } = totals

  // console.log("Totals on completion page", totals)
  const shippingMethodsAmount = shippingMethods?.map((item) =>
    Number(item.amount)
  )

  return (
    <div>
      <div className="flex flex-col gap-y-3 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center text-black Poppins400">
            Subtotal * {totals?.items?.length} items
          </span>
          <span
            data-testid="cart-subtotal"
            data-value={subtotal || 0}
            className="text-black Poppins400"
          >
            {convertToLocale({ amount: subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between text-black Poppins400">
          <span>Shipping</span>
          {shipping_subtotal !== 0 ? (
            <span
              data-testid="cart-shipping"
              data-value={shipping_subtotal || 0}
            >
              {convertToLocale({
                amount: shipping_subtotal ?? 0,
                currency_code,
              })}
            </span>
          ) : (
            <span data-testid="cart-shipping">
              {convertToLocale({
                amount: shippingMethodsAmount?.[0] ?? 0,
                currency_code,
              })}
            </span>
          )}
        </div>
        <div className="flex justify-between text-black Poppins400">
          <span className="flex gap-x-1 items-center ">Estimated taxes</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      <div className="h-px w-full border-b border-gray-200 my-3" />
      <div className="flex items-center justify-between mb-2 text-[1.188rem] Poppins600">
        <span className="Poppins600">Total</span>
        <div>
          <span className="Poppins400 text-xs uppercase mr-1">
            {currency_code}
          </span>
          <span
            className="txt-xlarge-plus Poppins600"
            data-testid="cart-total"
            data-value={total ?? 0}
          >
            {convertToLocale({ amount: total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className="h-px w-full border-b border-gray-200 mt-4" />
    </div>
  )
}

export default CartTotals
