"use client"

import { useEffect, useState } from "react"
import {
  initiatePaymentSession,
  setAddresses,
  updateCart,
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
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { RadioGroup, Radio } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import MedusaRadio from "@modules/common/components/radio"
import { convertToLocale } from "@lib/util/money"
import { placeOrder } from "@lib/data/cart"
import MobileCartTotal from "../mobile-cart-total"
import PaymentForm from "../payment-form"
import Script from "next/script"
import { useSearchParams } from "next/navigation"

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
  const searchParams = useSearchParams()

  const sessionIdMPGS = searchParams.get("session_id")
  const [paymentHandling, setPaymentHandling] = useState(false)
  // const paymentAttemptMPGS = searchParams.get("payment_attempt")

  useEffect(() => {
    if (sessionIdMPGS) {
      console.log("Session ID", sessionIdMPGS)
      setPaymentHandling(true)
      handlePayment()
    }
  }, [])

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
    cart?.shipping_methods?.[0]?.shipping_option_id || null
  )
  const [PlaceOrder, setPlaceOrder] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("pp_mpgs_mpgs")

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleSetShippingMethod = async (id: string) => {
    setError(null)
    setIsLoading(true)
    setShippingMethodId(id)
    setIsLoading(false)
  }

  const onPaymentCompleted = async () => {
    console.log("Placing order")
    await placeOrder()
      .then(() => setButtonText("Order Placed"))
      .catch((err) => {
        if (err.message !== "NEXT_REDIRECT") {
          setPaymentHandling(false)
          const element = document.getElementById("payment-error")
          element?.scrollIntoView({
            behavior: "smooth",
          })
          console.log("Error placing order", err)
          setErrorMessage(
            "The provided card details are invalid. Please try again."
          )
        }
      })
      .finally(() => {
        console.log("Finally on place order")
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)
    console.log("On payment completed")
    onPaymentCompleted()
  }

  const handleSubmitPaymentMethod = async () => {
    setIsLoading(true)
    try {
      // if (!activeSession && cart) {
      if (cart) {
        let paymentAttempt = 0
        if (cart.metadata && "payment_attempt" in cart.metadata) {
          paymentAttempt = Number(cart.metadata.payment_attempt) + 1

          await updateCart({
            metadata: {
              ...cart.metadata,
              payment_attempt: paymentAttempt,
            },
          })
        } else {
          await updateCart({
            metadata: { ...cart.metadata, payment_attempt: 0 },
          })
        }
        const response = await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
          context: {
            payment_type: "card",
            card_number: cardNumber,
            expiry_date: expiryDate,
            security_code: securityCode,
            name_on_card: nameOnCard,
            cart_id: cart?.id,
            payment_attempt: paymentAttempt,
            cart: cart,
          },
        })

        // @ts-ignore
        if (response.payment_collection.payment_sessions[0].data) {
          const sessionId =
            // @ts-ignore
            response.payment_collection.payment_sessions[0].data?.session_id
          console.log("Session ID", sessionId)

          // @ts-ignore
          ThreeDS.configure({
            merchantId: process.env.NEXT_PUBLIC_MPGS_MERCHANT_ID,
            sessionId: sessionId,
            containerId: "three-ds-container",
            callback: function () {
              // @ts-ignore
              if (ThreeDS.isConfigured()) {
                console.log("Done with configure")

                // @ts-ignore
                ThreeDS.initiateAuthentication(
                  `OrdID_${cart.id}_${paymentAttempt}`,
                  `TxnID_${cart.id}_${paymentAttempt}`,
                  function (data: any) {
                    if (data && data.error) {
                      var error = data.error
                      // Something bad happened, the error value will match what is returned by the Authentication API
                      console.error("error.code : ", error.code)
                      console.error("error.msg : ", error.msg)
                      console.error("error.result : ", error.result)
                      console.error("error.status : ", error.status)
                      setSubmitting(false)
                      setPaymentHandling(false)
                      setErrorMessage(
                        "The provided card details are invalid. Please try again."
                      )
                    } else {
                      console.log("After Initiate 3DS ", data)

                      //data.response will contain information like gatewayRecommendation, authentication version, etc.
                      console.log(
                        "REST API raw response ",
                        data.restApiResponse
                      )
                      console.log("Correlation Id", data.correlationId)
                      console.log(
                        "Gateway Recommendation",
                        data.gatewayRecommendation
                      )
                      console.log("HTML Redirect Code", data.htmlRedirectCode)
                      console.log(
                        "Authentication Version",
                        data.authenticationVersion
                      )

                      console.log("Initiate DATA", data)

                      switch (data.gatewayRecommendation) {
                        case "PROCEED":
                          console.log("Proceed with the transaction")
                          const orderId = `OrdID_${cart.id}_${paymentAttempt}`
                          const transactionId = `TxnID_${cart.id}_${paymentAttempt}`
                          console.log("Order ID", orderId)
                          console.log("Transaction ID", transactionId)

                          // @ts-ignore
                          ThreeDS.authenticatePayer(
                            orderId,
                            transactionId,
                            function (data: any) {
                              if (!data.error) {
                                //data.response will contain all the response payload from the AUTHENTICATE_PAYER call.
                                console.log(
                                  "REST API response ",
                                  data.restApiResponse
                                )
                                console.log(
                                  "HTML redirect code ",
                                  data.htmlRedirectCode
                                )
                              }
                            },
                            { fullScreenRedirect: true }
                          )
                          // authenticatePayer(); //merchant's method
                          break
                        case "RESUBMIT_WITH_ALTERNATIVE_PAYMENT_DETAILS":
                          console.log("Invalid creds")
                          setSubmitting(false)
                          setPaymentHandling(false)
                          setErrorMessage(
                            "The provided card details are invalid. Please try again."
                          )
                          // tryOtherPayment(); //Card does not support 3DS and transaction filtering rules require 3DS on this transaction: Ask the payer to select a different payment method
                          break
                      }
                    }
                  },
                  {
                    sourceOfFunds: {
                      type: "CARD",
                    },
                  }
                )
              }
            },
            configuration: {
              userLanguage: "en-US",
              wsVersion: 100,
            },
          })
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
      // const formData = new FormData(e.currentTarget)

      // await setAddresses(null, formData)
      setPlaceOrder(true)
      console.log("Shipping Method ID", shippingMethodId)
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
    }
    // finally {
    //   setSubmitting(false)
    // }
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

  return (
    <>
      {paymentHandling && (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
          <div className="flex justify-center items-center mt-[50vh]">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </div>
      )}
      <Script src="https://ap-gateway.mastercard.com/static/threeDS/1.3.0/three-ds.min.js" />
      <div id="three-ds-container"></div>

      <form onSubmit={handlePlaceOrder}>
        <div className="pb-8">
          <ShippingAddress
            customer={customer}
            checked={sameAsBilling}
            onChange={toggleSameAsBilling}
            cart={cart}
            PlaceOrder={PlaceOrder}
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
                        "flex items-center justify-between text-small-regular cursor-pointer py-3 border rounded-t-md px-4 mb-2 hover:shadow-borders-interactive-with-active",
                        {
                          "border-t-[1px]  bg-[#F4F7FA] border-black":
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
          <div id="payment-error">
            <ErrorMessage
              error={errorMessage}
              data-testid="manual-payment-error-message"
            />
          </div>

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
