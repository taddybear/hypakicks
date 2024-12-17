import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Search from "@modules/layout/components/search"
import Image from "next/image"
import Hypakicks from "../../../../../public/homepage/hypakicks.webp"
import Slider from "@modules/layout/components/slider"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const menuItems = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Shop",
      url: "/shop",
    },
    {
      title: "About Us",
      url: "/about-us",
    },
    {
      title: "Contact Us",
      url: "/contact-us",
    },
    {
      title: "Shipping & Delivery",
      url: "/shipping-and-delivery",
    },
    {
      title: "FAQ",
      url: "/faq",
    },
    {
      title: "Order Tracking",
      url: "/orders-tracking",
    },
  ]

  return (
    <div>
      <Slider />

      <div className="container flex items-center justify-between w-full py-2 lg:py-[1.25rem] px-3 lg:px-0">
        <div className="flex items-center w-full lg:lg:w-[16.66666667%]">
          <SideMenu regions={regions} />
          <a href="/" className="w-[150px] lg:w-full">
            <Image
              src={Hypakicks}
              width={466}
              height={96}
              alt=""
              className=""
            />
          </a>
        </div>
        <ul className="hidden lg:flex mx-4 lg:w-[66.66666667%]">
          {menuItems.map((item, index) => (
            <a
              href={item.url}
              key={index}
              className="mx-[0.625rem] text-sm text-[#44b865] whitespace-nowrap Poppins700"
            >
              {item.title}
            </a>
          ))}
        </ul>
        <div className="flex items-center lg:w-[16.66666667%]">
          <Search />
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/account"
            data-testid="nav-account-link"
          >
            <div className="m-[0.313rem] px-2 py-1.5 rounded-full border-2 border-[#44b865]">
              <div className="w-[20px] h-full">
                <a href="/account">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    focusable="false"
                    style={{
                      userSelect: "none",
                      width: "100%",
                      height: "100%",
                      display: "inline-block",
                      fill: "rgb(68, 184, 101)", // Your color
                      flexShrink: 0,
                    }}
                  >
                    <g
                      style={{
                        fill: "rgb(68, 184, 101)", // Your color
                        stroke: "black", // Example stroke color
                        strokeWidth: 2, // Stroke width for "boldness"
                      }}
                    >
                      <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20ZM79.57,196.57a60,60,0,0,1,96.86,0,83.72,83.72,0,0,1-96.86,0ZM100,120a28,28,0,1,1,28,28A28,28,0,0,1,100,120ZM194,179.94a83.48,83.48,0,0,0-29-23.42,52,52,0,1,0-74,0,83.48,83.48,0,0,0-29,23.42,84,84,0,1,1,131.9,0Z"></path>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </LocalizedClientLink>
          <Suspense
            fallback={
              <LocalizedClientLink
                className="hover:text-ui-fg-base flex gap-2"
                href="/cart"
                data-testid="nav-cart-link"
              >
                {/* Cart  (0) */}
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
        </div>
      </div>
    </div>

    // <div className="sticky top-0 inset-x-0 z-50 group">
    //   <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
    //     <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
    //       <div className="flex-1 basis-0 h-full flex items-center">
    //         <div className="h-full">
    //           <SideMenu regions={regions} />
    //         </div>
    //       </div>

    //       <div className="flex items-center h-full">
    //         <LocalizedClientLink
    //           href="/"
    //           className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
    //           data-testid="nav-store-link"
    //         >
    //           Medusa Store
    //         </LocalizedClientLink>
    //       </div>

    //       <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
    //         <div className="hidden small:flex items-center gap-x-6 h-full">
    //           <LocalizedClientLink
    //             className="hover:text-ui-fg-base"
    //             href="/account"
    //             data-testid="nav-account-link"
    //           >
    //             Account
    //           </LocalizedClientLink>
    //         </div>
    //         <Suspense
    //           fallback={
    //             <LocalizedClientLink
    //               className="hover:text-ui-fg-base flex gap-2"
    //               href="/cart"
    //               data-testid="nav-cart-link"
    //             >
    //               Cart (0)
    //             </LocalizedClientLink>
    //           }
    //         >
    //           <CartButton />
    //         </Suspense>
    //       </div>
    //     </nav>
    //   </header>
    // </div>
  )
}
