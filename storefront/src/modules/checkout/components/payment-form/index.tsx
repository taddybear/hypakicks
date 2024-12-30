import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { RadioGroup, Radio } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import { Fragment, useEffect, useRef, useState } from "react"
import MedusaRadio from "@modules/common/components/radio"
import React from "react"

interface PaymentFormProps {
  setCardNumber: (value: string) => void
  setExpiryDate: (value: string) => void
  setNameOnCard: (value: string) => void
  setSecurityCode: (value: string) => void
  setPaymentOption: (value: string) => void
  paymentOption: string
  cardNumber: string
  expiryDate: string
  securityCode: string
  nameOnCard: string
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  setPaymentOption,
  setCardNumber,
  setExpiryDate,
  setNameOnCard,
  setSecurityCode,
  paymentOption,
  cardNumber,
  expiryDate,
  securityCode,
  nameOnCard,
}) => {
  const cardNumberRef = useRef<HTMLInputElement>(null)
  const expiryDateRef = useRef<HTMLInputElement>(null)
  const securityCodeRef = useRef<HTMLInputElement>(null)
  const cardNameRef = useRef<HTMLInputElement>(null)
  const [formError, setFormError] = useState(false)

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 16) {
      value = value.slice(0, 16)
    }

    value = value.replace(/(\d{4})(?=\d)/g, "$1 ")

    setCardNumber(value)
  }

  const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 4) {
      value = value.slice(0, 4)
    }

    setSecurityCode(value)
  }
  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 4) {
      value = value.slice(0, 4)
    }
    if (value.length > 2) {
      value = value.slice(0, 2) + " / " + value.slice(2)
    }

    setExpiryDate(value)
  }

  return (
    <>
      {/* Credit Card */}
      <RadioGroup>
        <RadioGroup
          value=""
          className={`flex flex-col gap-y-2 text-small-regular cursor-pointer py-3 border-2 rounded-t-md px-4 ${
            paymentOption === "credit_card" ? "border-black bg-[#f4f7fa]" : ""
          } `}
          onClick={() => setPaymentOption("credit_card")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Radio value="credit_card" />
              <div className="flex items-center mr-4">
                <MedusaRadio checked={paymentOption === "credit_card"} />
              </div>
              <p className="text-base-regular Poppins400">Credit card</p>
            </div>
            <div className="flex space-x-1">
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                width="38"
                height="24"
                aria-labelledby="pi-visa"
              >
                <title id="pi-visa">Visa</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                />
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                />
                <path
                  d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                  fill="#142688"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 38 24"
                role="img"
                width="38"
                height="24"
                aria-labelledby="pi-master"
              >
                <title id="pi-master">Mastercard</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                />
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                />
                <circle fill="#EB001B" cx="15" cy="12" r="7" />
                <circle fill="#F79E1B" cx="23" cy="12" r="7" />
                <path
                  fill="#FF5F00"
                  d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                />
              </svg>
            </div>
          </div>
        </RadioGroup>
      </RadioGroup>
      {/* <Popover>
        <Transition
          show={paymentOption === "credit_card"}
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-250"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        > */}
      {/* <PopoverPanel static> */}
      {paymentOption === "credit_card" && (
        <div className="bg-[#f4f4f4] p-4 space-y-4 border-[#DDDDDD]">
          <div className="flex relative z-0 w-full txt-compact-medium">
            <input
              type="text"
              name="card-number"
              id="card-number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder={""}
              className={`Poppins400 px-4 pt-5 pb-2 h-12 bg-white border-[1px] w-full rounded-md ${
                formError ? "border-red-600" : "border-[#DEDEDE]"
              }`}
              ref={cardNumberRef}
              tabIndex={1}
            />
            <label
              htmlFor="card-number"
              onClick={() => cardNumberRef.current?.focus()}
              className="Poppins400 text-[0.6rem] lg:text-sm flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3.5 -z-1 origin-0 text-ui-fg-subtle"
            >
              Card number
            </label>
            <div className="absolute top-0 h-full flex items-center right-4">
              <svg
                fill="#575757"
                height="18px"
                width="18px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 485 485"
                xmlSpace="preserve"
                stroke="#575757"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M345,175v-72.5C345,45.981,299.019,0,242.5,0S140,45.981,140,102.5V175H70v310h345V175H345z M170,102.5 c0-39.977,32.523-72.5,72.5-72.5S315,62.523,315,102.5V175H170V102.5z M385,455H100V205h285V455z" />{" "}
                </g>
              </svg>
            </div>
            {formError && (
              <p className="text-red-600 text-sm mt-1 Poppins400">
                Enter a card number
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <div className="flex relative z-0 w-1/2 txt-compact-medium">
              <input
                type="text"
                name="expiration-date"
                id="expiration-date"
                placeholder={""}
                value={expiryDate}
                onChange={handleExpirationChange}
                className={`Poppins400 px-4 pt-5 pb-2 h-12 bg-white border-[1px] w-full rounded-md ${
                  formError ? "border-red-600" : "border-[#DEDEDE]"
                }`}
                ref={expiryDateRef}
                tabIndex={2}
              />
              <label
                htmlFor="expiration-date"
                onClick={() => expiryDateRef.current?.focus()}
                className="Poppins400 text-[0.6rem] lg:text-sm flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3.5 -z-1 origin-0 text-ui-fg-subtle"
              >
                Expiry date (MM / YY)
              </label>

              {formError && (
                <p className="text-red-600 text-sm mt-1 Poppins400">
                  Enter a valid expiration date
                </p>
              )}
            </div>
            <div className="flex relative z-0 w-1/2 txt-compact-medium">
              <input
                type="number"
                name="security-code"
                id="security-code"
                value={securityCode}
                onChange={handleSecurityCodeChange}
                placeholder={""}
                className={`Poppins400 px-4 pt-5 pb-2 h-12 bg-white border-[1px] w-full rounded-md ${
                  formError ? "border-red-600" : "border-[#DEDEDE]"
                }`}
                ref={securityCodeRef}
                tabIndex={3}
              />
              <label
                htmlFor="security-code"
                onClick={() => securityCodeRef.current?.focus()}
                className="Poppins400 text-[0.6rem] lg:text-sm flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3.5 -z-1 origin-0 text-ui-fg-subtle"
              >
                Security code
              </label>
              <div className="absolute top-0 right-4 h-full flex items-center">
                <div className="relative group">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.75 3C5.75 4.51878 4.51878 5.75 3 5.75C1.48122 5.75 0.25 4.51878 0.25 3C0.25 1.48122 1.48122 0.25 3 0.25C4.51878 0.25 5.75 1.48122 5.75 3Z"
                      stroke="#575757"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M2.66331 3.97727V3.95597C2.66568 3.72988 2.68935 3.54995 2.73433 3.41619C2.77931 3.28243 2.84323 3.17412 2.92609 3.09126C3.00895 3.0084 3.10838 2.93205 3.22439 2.86222C3.29423 2.8196 3.35696 2.76929 3.4126 2.71129C3.46823 2.65211 3.51203 2.58404 3.54399 2.5071C3.57713 2.43016 3.59371 2.34493 3.59371 2.25142C3.59371 2.13542 3.56648 2.0348 3.51203 1.94957C3.45758 1.86435 3.38478 1.79865 3.29363 1.75249C3.20249 1.70632 3.10128 1.68324 2.99001 1.68324C2.89295 1.68324 2.79943 1.70336 2.70947 1.74361C2.61951 1.78385 2.54434 1.84718 2.48398 1.93359C2.42361 2.02 2.38869 2.13305 2.37922 2.27273H1.93177C1.94124 2.0715 1.99333 1.89927 2.08802 1.75604C2.1839 1.61281 2.30997 1.50331 2.46622 1.42756C2.62365 1.3518 2.79825 1.31392 2.99001 1.31392C3.19835 1.31392 3.37945 1.35535 3.53334 1.43821C3.6884 1.52107 3.80796 1.63471 3.892 1.77912C3.97723 1.92353 4.01984 2.08807 4.01984 2.27273C4.01984 2.40294 3.99972 2.52071 3.95947 2.62607C3.92041 2.73142 3.86359 2.82552 3.78902 2.90838C3.71563 2.99124 3.62685 3.06463 3.52268 3.12855C3.41852 3.19366 3.33506 3.26231 3.27233 3.33452C3.20959 3.40554 3.16402 3.49018 3.13561 3.58842C3.1072 3.68667 3.09181 3.80919 3.08944 3.95597V3.97727H2.66331ZM2.89058 5.02841C2.80299 5.02841 2.72782 4.99704 2.66508 4.9343C2.60235 4.87157 2.57098 4.7964 2.57098 4.70881C2.57098 4.62121 2.60235 4.54605 2.66508 4.48331C2.72782 4.42057 2.80299 4.3892 2.89058 4.3892C2.97818 4.3892 3.05334 4.42057 3.11608 4.48331C3.17881 4.54605 3.21018 4.62121 3.21018 4.70881C3.21018 4.76681 3.19539 4.82008 3.16579 4.86861C3.13738 4.91714 3.09891 4.9562 3.05038 4.9858C3.00303 5.0142 2.94977 5.02841 2.89058 5.02841Z"
                      fill="#575757"
                    />
                  </svg>
                  <div className="Popppins400 absolute text-center w-[10rem] bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs px-3 py-2 rounded shadow-lg">
                    3-digit security code usually found on the back of your
                    card. American Express cards have a 4-digit code located on
                    the front.
                  </div>
                </div>
              </div>
              {formError && (
                <p className="text-red-600 text-sm mt-1 Poppins400">
                  Enter the CVV or security code on your card
                </p>
              )}
            </div>
          </div>
          <div className="flex relative z-0 w-full txt-compact-medium">
            <input
              type="text"
              name="card-name"
              id="card-name"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder={""}
              className={`Poppins400 px-4 pt-5 pb-2 h-12 bg-white border-[1px] w-full rounded-md ${
                formError ? "border-red-600" : "border-[#DEDEDE]"
              }`}
              ref={cardNameRef}
              tabIndex={4}
            />
            <label
              htmlFor="name-on-card"
              onClick={() => cardNameRef.current?.focus()}
              className="Poppins400 text-[0.6rem] lg:text-sm flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3.5 -z-1 origin-0 text-ui-fg-subtle"
            >
              Name on Card
            </label>

            {formError && (
              <p className="text-red-600 text-sm mt-1 Poppins400">
                Enter your name exactly as it’s written on your card
              </p>
            )}
          </div>
        </div>
      )}

      {/* </PopoverPanel>
        </Transition>
      </Popover> */}

      {/* Apple Pay */}
      {/*  <RadioGroup>
        <RadioGroup
          value=""
          className={`flex flex-col gap-y-2 text-small-regular cursor-pointer py-3 border-2 px-4 ${
            paymentOption === "apple_pay" ? "border-black bg-[#f4f7fa]" : ""
          }`}
          onClick={() => setPaymentOption("apple_pay")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Radio
                value="credit_card"
                onChange={() => setPaymentOption("apple_pay")}
              />
              <div className="flex items-center mr-4">
                <MedusaRadio checked={paymentOption === "apple_pay"} />
              </div>
              <p className="text-base-regular Poppins400">Apple Pay</p>
            </div>
          </div>
        </RadioGroup>
      </RadioGroup>
      */}
    </>
  )
}

export default PaymentForm
