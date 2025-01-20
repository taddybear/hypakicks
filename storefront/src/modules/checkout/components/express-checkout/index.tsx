"use client"
import Script from "next/script"
import { useState, useEffect } from "react"

export default function ExpressCheckout() {
  const [showApplePay, setShowApplePay] = useState(false)

  useEffect(() => {
    const enableApplePayButton = async () => {
      if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
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

  const initiateApplePay = () => {
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
            value: "50",
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

      request.show()

      request.onmerchantvalidation = (event: any) => {
        const merchantSessionPromise = fetch(
          "https://hypakicks-production.up.railway.app/store/authorizeMerchant"
        )
          .then((res) => res.json()) // Parse the response as JSON.
          .catch((err) => {
            console.error("Error fetching merchant session", err)
          })

        event.complete(merchantSessionPromise)
      }
    }
  }

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
        {/* {showApplePay && ( */}
        <apple-pay-button
          buttonstyle="black"
          type="buy"
          locale="en-US"
          onClick={() => initiateApplePay()}
        ></apple-pay-button>
        {/* )} */}
        {/* <button className="bg-[#592FF4] w-1/2 py-2 rounded-md space-x-1 flex items-center justify-center">
          <p className="text-white Poppins600 text-lg">shop</p>
          <p className="text-[#592FF4] bg-white text-xs p-[0.125rem] px-[0.25rem] rounded-sm">
            Pay
          </p>
        </button>
        <button className="bg-[#ffc439] w-1/2 py-2 rounded-md space-x-1 flex items-center justify-center">
          <div className="w-20 h-auto">
            <PayPalSvg />
          </div>
        </button> */}
      </div>
      <div className="flex items-center my-4 mb-8">
        <div className="bg-[#eee] h-[1px] w-1/2"></div>
        <p className="mx-2 text-[#707070]">OR</p>
        <div className="bg-[#eee] h-[1px] w-1/2"></div>
      </div>
    </>
  )
}
