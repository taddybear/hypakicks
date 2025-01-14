"use client"

import { useEffect, useState } from "react"
import {
  initiatePaymentSession,
  setAddresses,
  // updatePaymentSession,
} from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import {
  Heading,
  Text,
  useToggleState,
  clx,
  Button,
  Tooltip,
} from "@medusajs/ui"
// import parse from "html-react-parser"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { RadioGroup, Radio } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import MedusaRadio from "@modules/common/components/radio"
import { convertToLocale } from "@lib/util/money"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import MobileCartTotal from "../mobile-cart-total"
import PaymentForm from "../payment-form"
import { update } from "lodash"

const Addresses = ({
  cart,
  customer,
  availableShippingMethods,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart?.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )
  const [paymentOption, setPaymentOption] = useState("credit_card")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [securityCode, setSecurityCode] = useState("")
  const [nameOnCard, setNameOnCard] = useState("")
  const [buttonText, setButtonText] = useState("Place order")
  const [submitting, setSubmitting] = useState(false)
  const [threeDSHtml, setThreeDSHtml] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formattedCardNumber, setFormattedCardNumber] = useState("")
  const [formattedExpiryDate, setFormattedExpiryDate] = useState("")
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart?.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("pp_mpgs_mpgs")

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  const handleSetShippingMethod = async (id: string) => {
    setError(null)
    setIsLoading(true)
    setShippingMethodId(id)
    setIsLoading(false)
  }

  const handleSubmitPaymentMethod = async () => {
    setIsLoading(true)
    try {
      // if (!activeSession && cart) {
      if (cart) {
        const response = await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
          context: {
            payment_type: "card",
            card_number: cardNumber,
            expiry_date: expiryDate,
            security_code: securityCode,
            name_on_card: nameOnCard,
            cart_id: cart?.id,
          },
        })

        // console.log("Cart response", response)
        // 3ds data is in response.payment_collection.payment_sessions[0].data
        // if three_d_secure is true, then we need to handle 3ds then we need to handle html
        if (response.payment_collection.payment_sessions[0].data) {
          const threeDSData =
            response.payment_collection.payment_sessions[0].data
          if (threeDSData.threeDS) {
            // show html
            setThreeDSHtml(threeDSData.html)
          } else {
            // just complete the payment
            // handlePayment()
          }
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitShippingMethod = async (id: string) => {
    // console.log("handleSubmitShippingMethod called with id:", id)
    setError(null)
    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    try {
      await setShippingMethod({ cartId: cart?.id || "", shippingMethodId: id })
      // console.log("Shipping method set successfully")
    } catch (err) {
      console.error("Error setting shipping method:", err)
      setShippingMethodId(currentId)
      // setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      await setAddresses(null, formData)

      if (shippingMethodId) {
        // console.log("shippingMethodId", shippingMethodId)
        await handleSubmitShippingMethod(shippingMethodId)

        console.log("Payment method", availablePaymentMethods)

        if (!selectedPaymentMethod) {
          // console.error("No payment method selected")
          throw new Error("Please select a payment method.")
        }
        // After setting the shipping method, submit the payment method
        await handleSubmitPaymentMethod()

        // handlePayment()
      } else {
        // console.error("No shipping method selected")
        throw new Error("Please select a shipping method.")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during submission.")
    } finally {
      setSubmitting(false)
      setButtonText("Order Placed")
    }
  }

  useEffect(() => {
    const sanitizedCardNumber = cardNumber.replace(/\s/g, "")
    setFormattedCardNumber(sanitizedCardNumber)
    const sanitizedExpiryDate = expiryDate.replace(/[\s/]/g, "")
    setFormattedExpiryDate(sanitizedExpiryDate)
  }, [cardNumber, expiryDate])

  useEffect(() => {
    if (cart?.shipping_methods?.length) {
      setShippingMethodId(
        cart.shipping_methods.at(-1)?.shipping_option_id || null
      )
    } else if (availableShippingMethods?.length) {
      setShippingMethodId(availableShippingMethods[0]?.id || null)
    }
  }, [cart, availableShippingMethods])

  // useEffect(() => {
  //   console.log("cart", cart)
  // }, [cart])

  return (
    <>
      {threeDSHtml && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[480px] h-[640px] relative">
            <button
              onClick={() => setThreeDSHtml(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <div className="p-4">{parse(threeDSHtml)}</div>
          </div>
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div className="pb-8">
          <ShippingAddress
            customer={customer}
            checked={sameAsBilling}
            onChange={toggleSameAsBilling}
            cart={cart}
          />

          {/* shipping method */}
          <h1 className="Poppins600 mt-8 my-4">Shipping method</h1>
          <div data-testid="delivery-options-container">
            <div className="pb-8">
              <RadioGroup
                value={shippingMethodId}
                onChange={handleSetShippingMethod}
              >
                {availableShippingMethods?.map((option) => {
                  return (
                    <Radio
                      key={option.id}
                      value={option.id}
                      data-testid="delivery-option-radio"
                      className={clx(
                        "flex items-center justify-between text-small-regular cursor-pointer py-3 border rounded-rounded px-4 mb-2 hover:shadow-borders-interactive-with-active",
                        {
                          "border-[1px] border-black":
                            option.id === shippingMethodId,
                        }
                      )}
                    >
                      <div className="flex items-center">
                        <MedusaRadio checked={option.id === shippingMethodId} />
                        <span className="text-base-regular pl-4 Poppins400">
                          {option.name}
                        </span>
                      </div>
                      <span className="justify-self-end Poppins400 text-ui-fg-base">
                        {convertToLocale({
                          amount: option.amount!,
                          currency_code: cart?.currency_code || "",
                        })}
                      </span>
                    </Radio>
                  )
                })}
              </RadioGroup>
            </div>

            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
          </div>

          {/* payment method */}
          <h1 className="text-[1.313rem] Poppins600 mb-4">Payment</h1>
          {/* <RadioGroup
            value={selectedPaymentMethod}
            onChange={(value: string) => setSelectedPaymentMethod(value)}
          >
            {availablePaymentMethods.map((paymentMethod) => {
              return (
                <PaymentContainer
                  paymentInfoMap={paymentInfoMap}
                  paymentProviderId={paymentMethod.id}
                  key={paymentMethod.id}
                  selectedPaymentOptionId={selectedPaymentMethod}
                />
              )
            })}
          </RadioGroup> */}

          {/* Payment form */}
          <PaymentForm
            setPaymentOption={setPaymentOption}
            paymentOption={paymentOption}
            setCardNumber={setCardNumber}
            cardNumber={cardNumber}
            setExpiryDate={setExpiryDate}
            expiryDate={expiryDate}
            setSecurityCode={setSecurityCode}
            securityCode={securityCode}
            setNameOnCard={setNameOnCard}
            nameOnCard={nameOnCard}
          />

          <MobileCartTotal cart={cart} />
          {/* <div className="flex items-start gap-x-1 w-full lg:mt-8 my-6">
            <div className="w-full">
              <Text className="text-sm Poppins400 mb-1">
                By clicking the Place Order button, you confirm that you have
                read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read Medusa
                Store&apos;s Privacy Policy.
              </Text>
            </div>
          </div> */}
          <Button
            isLoading={submitting}
            type="submit"
            size="large"
            data-testid="submit-order-button"
            className="bg-[#161d25] lg:mt-8 mt-6 hover:bg-black py-3 !rounded-sm Poppins600 w-full text-lg"
          >
            {buttonText}
          </Button>
          <ErrorMessage
            error={errorMessage}
            data-testid="manual-payment-error-message"
          />

          <p className="mt-4 text-[#707070] text-sm Poppins400">
            Your info will be saved to a Shop account. By continuing, you agree
            to Shop’s
            <a
              href="/term-and-conditions"
              className="text-[#161d25] Poppins400 px-1 underline"
            >
              Terms & Conditions
            </a>
            and acknowledge the
            <a
              href="/privacy-policy"
              className="text-[#161d25] Poppins400 px-1 underline"
            >
              Privacy Policy.
            </a>
          </p>
        </div>
      </form>
    </>
  )
}

export default Addresses
