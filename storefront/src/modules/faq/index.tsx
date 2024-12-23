"use client"
import { useState } from "react"

type FAQItem = {
  title: string
  content: string
}
const Dispatch: FAQItem[] = [
  {
    title: "What are the shipping costs?",
    content:
      "We have free shipping in All Countries. We send all orders insured with track & trace.",
  },
  {
    title: "How long does shipping take?",
    content:
      "We have a 48-hour delivery on certain sneakers/sizes indicated. The rest is 2-10 business days.",
  },
  {
    title: "Do you also deliver to service points?",
    content:
      "Yes! You have the choice to collect your order at a service point nearby. NB! You can select this after paying for your order.",
  },
  {
    title: "How long does it take until I get my money back?",
    content:
      "We will process your return/exchange within 7 working days. However, this is often faster!",
  },
]
const Returns: FAQItem[] = [
  {
    title: "Can I exchange SALE products?",
    content: "Yes! You may exchange, return or cancel sale products.",
  },
  {
    title: "Can I return/exchange my product?",
    content:
      "If you are not satisfied with your order or it does not fit properly, you can return/exchange it within 14 days. There are rules attached to this, which you can find on the following page: Returns/exchanges",
  },
  {
    title: "How do I request a return/exchange?",
    content:
      "We only accept returns if they have been registered via our contact form.",
  },
  {
    title: "Will I receive a track trace code?",
    content:
      "Yes! You will receive this by email as soon as the sneakers have been sent. This can also often end up in your spam.",
  },
  {
    title: "Is buying on Hypa Kicks safe?",
    content:
      "Yes, we check all sneakers for authenticity and send all our products with insurance & tracking.",
  },
]
const Orders: FAQItem[] = [
  {
    title: "What payment methods do you have?",
    content:
      "We have several payment methods. We have Credit/Debit Card & Apple Pay",
  },
  {
    title: "Can i cancel my order?",
    content:
      "Yes! Within 24 hours: We will not charge any additional costs. After 24 hours, shipping and payment costs will be charged. We work internationally and incur costs within 24 hours to get your package to you as quickly as possible. In addition, if you ordered with Klarna, this will incur costs for us that we will not get back from Klarna. We must also calculate these costs. This depends on the order amount. Packages that are refused upon delivery will be charged a fee of €15 for shipping and payment costs.",
  },
  {
    title: "Do you have discount codes?hat payment methods do you have?",
    content:
      "Yes we have that! If you subscribe to our newsletter at the bottom of the page, you will receive a €5 standard discount. This is also valid on sale products.",
  },
  {
    title: "Do you give money back?",
    content:
      "We have a return period of 14 days. We will refund your money or you can exchange for another size.",
  },
]

const WhoAreWe: FAQItem[] = [
  {
    title: "Who are you?",
    content:
      "We are Hypa Kicks, a company that was started out of a passion by owner Lian Gietermans in Amsterdam. Now, 5 years later, we have already helped more than 20,000 customers with their sneakers.",
  },
  {
    title: "Are you Chamber of Commerce registered?",
    content:
      "Yes, Hypa Kicks is an officially registered company with the Chamber of Commerce.",
  },
  {
    title: "Do you have a physical store?",
    content:
      "Unfortunately we do not have a store, we are active with our online webshop.",
  },
  {
    title: "Do you give money back?",
    content:
      "We have a return period of 14 days. We will refund your money or you can exchange for another size.",
  },
]

export default function Faq() {
  const [activeDispatchIndex, setActiveDispatchIndex] = useState<number | null>(
    null
  )
  const [activeReturnsIndex, setActiveReturnsIndex] = useState<number | null>(
    null
  )
  const [activeOrdersIndex, setActiveOrdersIndex] = useState<number | null>(
    null
  )
  const [activeWhoAreWeIndex, setActiveWhoAreWeIndex] = useState<number | null>(
    null
  )
  const toggleAccordion = (
    index: number,
    sectionType: "dispatch" | "returns" | "orders" | "whoarewe"
  ) => {
    if (sectionType === "dispatch") {
      setActiveDispatchIndex(activeDispatchIndex === index ? null : index)
    } else if (sectionType === "returns") {
      setActiveReturnsIndex(activeReturnsIndex === index ? null : index)
    } else if (sectionType === "orders") {
      setActiveOrdersIndex(activeOrdersIndex === index ? null : index)
    } else if (sectionType === "whoarewe") {
      setActiveWhoAreWeIndex(activeWhoAreWeIndex === index ? null : index)
    }
  }
  return (
    <section className="container px-3 lg:px-0">
      <h1 className="text-center uppercase my-4 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
        FAQ
      </h1>

      {/* Dispatch */}
      <h1 className="text-[#4D4D4D] text-[2.5rem] lg:text-2xl Poppins700">
        Dispatch
      </h1>
      <div className="bg-[#ececec] my-6 rounded-[0.25rem]">
        {Dispatch.map((item, index) => (
          <div key={index} className="border-b-[1px] border-[#ddd] ">
            <button
              className={`accordion w-full  flex justify-between items-center text-left p-[0.938rem] font-medium text-gray-700  ${
                activeDispatchIndex === index ? "" : ""
              }`}
              onClick={() => toggleAccordion(index, "dispatch")}
            >
              <span className="Poppins500 text-lg">{item.title}</span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#44b865"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${
                  activeDispatchIndex === index ? "rotate-90" : "rotate-0"
                }`}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Accordion Content */}
            <div
              className={`panel overflow-hidden transition-[max-height] duration-300 ${
                activeDispatchIndex === index ? "max-h-screen" : "max-h-0"
              } `}
            >
              <div className=" p-[0.938rem]">
                <p className=" text-gray-600 pb-[1.5em] Poppins400 ">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Returns */}
      <h1 className="text-[#4D4D4D] text-[2.5rem] lg:text-2xl Poppins700">
        Returns
      </h1>
      <div className="bg-[#ececec] my-6 rounded-[0.25rem]">
        {Returns.map((item, index) => (
          <div key={index} className="border-b-[1px] border-[#ddd] ">
            <button
              className={`accordion w-full  flex justify-between items-center text-left p-[0.938rem] font-medium text-gray-700  ${
                activeReturnsIndex === index ? "" : ""
              }`}
              onClick={() => toggleAccordion(index, "returns")}
            >
              <span className="Poppins500 text-lg">{item.title}</span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#44b865"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${
                  activeReturnsIndex === index ? "rotate-90" : "rotate-0"
                }`}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Accordion Content */}
            <div
              className={`panel overflow-hidden transition-[max-height] duration-300 ${
                activeReturnsIndex === index ? "max-h-screen" : "max-h-0"
              } `}
            >
              <div className=" p-[0.938rem]">
                <p className=" text-gray-600 pb-[1.5em] Poppins400 ">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Orders */}
      <h1 className="text-[#4D4D4D] text-[2.5rem] lg:text-2xl Poppins700">
        Orders
      </h1>
      <div className="bg-[#ececec] my-6 rounded-[0.25rem]">
        {Orders.map((section, index) => (
          <div key={index} className="border-b-[1px] border-[#ddd] ">
            <button
              className={`accordion w-full flex justify-between items-center text-left p-[0.938rem] font-medium text-gray-700`}
              onClick={() => toggleAccordion(index, "orders")}
            >
              <span className="Poppins500 text-lg">{section.title}</span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#44b865"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${
                  activeOrdersIndex === index ? "rotate-90" : "rotate-0"
                }`}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Accordion Content */}
            <div
              className={`panel overflow-hidden transition-[max-height] duration-300 ${
                activeOrdersIndex === index ? "max-h-screen" : "max-h-0"
              } `}
            >
              <div className="p-[0.938rem]">
                <p className="text-gray-600 pb-[1.5em] Poppins400 ">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Who Are We */}
      <h1 className="text-[#4D4D4D] text-[2.5rem] lg:text-2xl Poppins700">
        Who Are We?
      </h1>
      <div className="bg-[#ececec] my-6 rounded-[0.25rem]">
        {WhoAreWe.map((section, index) => (
          <div key={index} className="border-b-[1px] border-[#ddd] ">
            <button
              className={`accordion w-full flex justify-between items-center text-left p-[0.938rem] font-medium text-gray-700`}
              onClick={() => toggleAccordion(index, "whoarewe")}
            >
              <span className="Poppins500 text-lg">{section.title}</span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#44b865"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${
                  activeWhoAreWeIndex === index ? "rotate-90" : "rotate-0"
                }`}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Accordion Content */}
            <div
              className={`panel overflow-hidden transition-[max-height] duration-300 ${
                activeWhoAreWeIndex === index ? "max-h-screen" : "max-h-0"
              } `}
            >
              <div className="p-[0.938rem]">
                <p className="text-gray-600 pb-[1.5em] Poppins400 ">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
