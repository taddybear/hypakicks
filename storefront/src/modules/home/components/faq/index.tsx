"use client"
import { SetStateAction, useState } from "react"

const Faq = () => {
  const accordionData = [
    {
      title: "Are your sneakers made from sustainable materials?",
      content:
        "Yes! All our sneakers are crafted from eco-friendly materials, such as recycled fabrics and responsibly sourced rubber.",
    },
    {
      title: "How do I care for my sneakers?",
      content:
        "We recommend hand-washing your sneakers with mild soap and water. Avoid using harsh chemicals to preserve the eco-friendly materials.",
    },
    {
      title: "Do you ship internationally?",
      content:
        "Absolutely! We offer worldwide shipping. Delivery times and rates vary by location—check our shipping policy for more details.",
    },
    {
      title: "What is your return policy?",
      content:
        "We offer a hassle-free return process within 30 days of purchase. Shoes must be in their original, unworn condition. For more information, visit our returns page.",
    },
    {
      title: "How can I track my order?",
      content:
        "Once your order has shipped, you will receive an email with a tracking number. You can also check the status of your order through your Hypa Kicks account.",
    },
  ]
  const [activeIndex, setActiveIndex] = useState(null)
  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <>
      <div className="container px-3">
        <div className="">
          <h1 className="text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700 my-4">
            FAQ
          </h1>
          <div className="bg-[#ececec] rounded-[0.25rem]">
            {accordionData.map((item, index) => (
              <div key={index} className="border-b-[1px] border-[#ddd] ">
                <button
                  className={`accordion w-full  flex justify-between items-center text-left p-[0.938rem] font-medium text-gray-700  ${
                    activeIndex === index ? "" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
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
                      activeIndex === index ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>

                {/* Accordion Content */}
                <div
                  className={`panel overflow-hidden transition-[max-height] duration-300 ${
                    activeIndex === index ? "max-h-screen" : "max-h-0"
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
        </div>
      </div>
    </>
  )
}

export default Faq
