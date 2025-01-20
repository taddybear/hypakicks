"use client"
import { initiatePaymentSession } from "@lib/data/cart"
import Script from "next/script"
import { useState, useEffect } from "react"

export default function ExpressCheckout({ cart }: any) {
  const [showApplePay, setShowApplePay] = useState(false)
  const [shippingAddress, setShippingAddress] = useState(null)

  useEffect(() => {
    const enableApplePayButton = async () => {
      if (window.ApplePaySession) {
        const button = document.querySelector("apple-pay-button")
        console.log("Apple pay button", button)
        if (button) {
          console.log("button exists")
          button.style.display = "block" // Make the button visible
          button.disabled = false // Enable the button
        }
      } else {
        console.log("Apple Pay is not available on this device or browser.")
      }
    }

    enableApplePayButton()
  }, [])

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
        // complete the payment on mastercard's side
        const paymentSession = await initiatePaymentSession(cart, {
          provider_id: "pp_mpgs_mpgs",
          context: {
            cart_id: cart.id,
            apple_pay: response.details.token,
          },
        })
      }
      console.log("Response", response)
    }
  }

  useEffect(() => {
    console.log("Shipping address", shippingAddress)
  }, [shippingAddress])

  return (
    <>
      <Script
        src="https://applepay.cdn-apple.com/jsapi/1.latest/apple-pay-sdk.js"
        strategy="beforeInteractive"
      />
      <h1 className=" text-center text-sm text-[#707070] Poppins400">
        Express checkout
      </h1>
      <div className="flex space-x-3 w-full mt-4 mb-6 !Poppins500">
        <apple-pay-button
          buttonstyle="black"
          type="buy"
          locale="en-US"
          onclick={initiateApplePay}
        ></apple-pay-button>
      </div>
      <div className="flex items-center my-4 mb-8">
        <div className="bg-[#eee] h-[1px] w-1/2"></div>
        <p className="mx-2 text-[#707070]">OR</p>
        <div className="bg-[#eee] h-[1px] w-1/2"></div>
      </div>
    </>
  )
}
