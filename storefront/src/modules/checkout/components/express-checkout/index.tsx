"use client"
import {
  initiatePaymentSession,
  placeOrder,
  setAppleAddress,
} from "@lib/data/cart"
import Script from "next/script"
import { useState, useEffect } from "react"

interface ShippingAddress {
  payerEmail: string
  addressLine: string[]
  city: string
  country: string
  dependentLocality: string
  organization: string
  phone: string
  postalCode: string
  recipient: string
  region: string
  sortingCode: string
}

interface Response {
  payerEmail: string
  shippingAddress: ShippingAddress
}

// const mapPaymentResponseToResponse = (paymentResponse: PaymentResponse): Response => {
//   return {
//     payerEmail: paymentResponse.payerEmail || "", // Default to an empty string if missing
//     shippingAddress: {
//       addressLine: paymentResponse.details.addressLine || [],
//       city: paymentResponse.details.city || "",
//       country: paymentResponse.details.country || "",
//       dependentLocality: paymentResponse.details.dependentLocality || "",
//       organization: paymentResponse.details.organization || "",
//       phone: paymentResponse.details.phone || "",
//       postalCode: paymentResponse.details.postalCode || "",
//       recipient: paymentResponse.details.recipient || "",
//       region: paymentResponse.details.region || "",
//       sortingCode: paymentResponse.details.sortingCode || "",
//     },
//   };
// };

export default function ExpressCheckout({ cart }: any) {
  const [showApplePay, setShowApplePay] = useState(false)
  const [shippingAddress, setShippingAddress] = useState(null)
  const [loading, isLoading] = useState(false)
  const [showLabel, setShowLabel] = useState(false)
  useEffect(() => {
    const enableApplePayButton = async () => {
      if (window.ApplePaySession) {
        const button = document.querySelector("apple-pay-button")
        console.log("Apple pay button..", button)
        if (button) {
          console.log("button exists", button)
          setShowLabel(true)
          button.style.display = "block" // Make the button visible
          button.disabled = false // Enable the button
        }
      } else {
        console.log("Apple Pay is not available on this device or browser.")
      }
    }

    enableApplePayButton()
  }, [])

  const handleSaveAdress = async (response: any) => {
    console.log("response.email", response.payerEmail)
    const email = response.payerEmail
    const recipient = response.shippingAddress.recipient || ""
    const [firstName, ...lastNameParts] = recipient.split(" ")
    const lastName = lastNameParts.join(" ")
    const country = response.shippingAddress.country
    const address_1 = response.shippingAddress.addressLine?.[0]
    const city = response.shippingAddress.city
    const zipCode = response.shippingAddress.postalCode
    const phone = response.shippingAddress.phone
    await setAppleAddress(null, {
      email,
      lastName,
      firstName,
      country,
      address_1,
      city,
      zipCode,
      phone,
    })
  }

  async function initiateApplePay() {
    console.log("Initiate Apple Pay")
    if (window.PaymentRequest) {
      const methods = [
        {
          supportedMethods: "https://apple.com/apple-pay",
          data: {
            version: 14,
            merchantIdentifier: "merchant.com.railway.hypakicks",
            merchantCapabilities: ["supports3DS"],
            supportedNetworks: ["masterCard", "visa"],
            countryCode: "AE",
          },
        },
      ]
      const details = {
        total: {
          label: "Hypakicks",
          amount: {
            value: "5656",
            currency: "AED",
          },
        },
      }
      const options = {
        requestPayerName: false,
        requestPayerEmail: true,
        requestPayerPhone: false,
        requestShipping: true,
        shippingType: "shipping" as PaymentShippingType,
      }
      const request = new PaymentRequest(methods, details, options)
      console.log("Request", request)

      request.onmerchantvalidation = (event: any) => {
        const merchantSessionPromise = fetch(
          "https://hypakicks-production.up.railway.app/store/pay",
          {
            headers: {
              "x-publishable-api-key":
                "pk_8f884385f2f090a5c8738e6de29f817d81b9e3b83f14c412ccae6fa1604beac0",
            },
          }
        )
          .then((res) => res.json()) // Parse the response as JSON.
          .catch((err) => {
            console.error("Error fetching merchant session", err)
          })

        event.complete(merchantSessionPromise)
      }

      request.onshippingaddresschange = (event: any) => {
        console.log("Shipping address change", request.shippingAddress)
        setShippingAddress(request.shippingAddress)
        event.updateWith({
          total: {
            label: "Hypakicks",
            amount: {
              value: "5656",
              currency: "AED",
            },
          },
        })
      }
      const response = await request.show()
      if (response) {
        console.log("Apple Pay final payment response", response)

        // complete the payment on mastercard's side
        const paymentSession = await initiatePaymentSession(cart, {
          provider_id: "pp_mpgs_mpgs",
          context: {
            cart_id: cart.id,
            apple_pay: response.details.token.paymentData,
            transaction_id: response.details.token.transactionIdentifier,
          },
        })

        console.log(
          "Response from payment provider",
          // @ts-ignore
          paymentSession.payment_collection
        )

        // @ts-ignore
        if (paymentSession.payment_collection.payment_sessions[0].data) {
          const applePayResult =
            // @ts-ignore
            paymentSession.payment_collection.payment_sessions[0]
          // @ts-ignore
          if (applePayResult.data.apple_pay_result === "SUCCESS") {
            isLoading(true)
            await handleSaveAdress(response)
            // show html
            console.log("Placing order")
            const applePayFinalize = await response.complete("success")
            console.log("Apple pay finalize", applePayFinalize)
            // save email, shipping & billing address to medusa cart
            await placeOrder()
              .then(() => console.log("Order placed"))
              .catch((err) => {
                console.log("Error placing order", err)
                // setErrorMessage(err.message)
              })
            // .finally(() => {
            //   console.log("Finally on place order")
            //   setSubmitting(false)
            // })
          } else {
            // show error
            isLoading(false)
            const applePayFinalize = await response.complete("fail")
            console.log("Apple Pay Failed", applePayFinalize)
          }
        }
      }
      console.log("Response", response)
    }
  }

  useEffect(() => {
    if (loading) {
      document.body.classList.add("h-[100vh]", "overflow-y-hidden")
    } else {
      document.body.classList.remove("h-[100vh]", "overflow-y-hidden")
    }
  }, [open])

  useEffect(() => {
    console.log("Shipping address", shippingAddress)
  }, [shippingAddress])

  return (
    <>
      {showLabel && (
        <h1 className=" text-center text-sm text-[#707070] Poppins400">
          Express checkout
        </h1>
      )}
      <div className="flex space-x-3 w-full mt-4 mb-6 !Poppins500">
        <apple-pay-button
          buttonstyle="black"
          type="buy"
          locale="en-US"
          onclick={initiateApplePay}
        ></apple-pay-button>
      </div>

      {showLabel && (
        <div className="flex items-center my-4 mb-8">
          <div className="bg-[#eee] h-[1px] w-1/2"></div>
          <p className="mx-2 text-[#707070]">OR</p>
          <div className="bg-[#eee] h-[1px] w-1/2"></div>
        </div>
      )}
      {loading && (
        <div className="fixed z-50 top-0 bg-black h-full w-full inset-0 bg-opacity-60 flex items-center justify-center">
          <div className="ml-3 border-gray-100 h-12 w-12 animate-spin rounded-full border-2 border-t-gray-500" />
        </div>
      )}
    </>
  )
}
