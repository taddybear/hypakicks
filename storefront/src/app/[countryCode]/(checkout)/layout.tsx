import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import HypaKicks from "../../../../public/homepage/hypakicks.webp"
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="w-full bg-white relative small:min-h-screen">
        <div className="py-6 flex justify-center border-b-2 border-[#eee]">
          <a href="/">
            <Image
              src={HypaKicks}
              alt=""
              width={180}
              height={42}
              className="w-[250px]"
            />
          </a>
        </div>

        <div className="relative" data-testid="checkout-container">
          {children}
        </div>
        {/* <div className="py-4 w-full flex items-center justify-center">
          <MedusaCTA />
        </div> */}
      </div>
    </>
  )
}
