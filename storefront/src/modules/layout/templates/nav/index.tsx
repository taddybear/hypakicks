import { Suspense, lazy } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Search from "@modules/layout/components/search"
import Image from "next/image"
import Hypakicks from "../../../../../public/homepage/hypakicks.webp"
import Slider from "@modules/layout/components/slider"
import Link from "next/link"

// const SideMenu = lazy(() => import("@modules/layout/components/side-menu"))

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
      title: "Contact Us",
      url: "/contact-us",
    },
    {
      title: "About Us",
      url: "/about-us",
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
      <Suspense fallback={<div></div>}>
        <Slider />
      </Suspense>

      <div className="container flex items-center justify-between w-full py-2 lg:py-[1.25rem] px-3 lg:px-0">
        <div className="flex items-center w-full lg:lg:w-[16.66666667%]">
          <Suspense fallback={<div></div>}>
            <SideMenu regions={regions} />
          </Suspense>

          <Link
            href="/"
            aria-label="Go to homepage"
            className="w-[150px] lg:w-full"
          >
            <Image
              src={Hypakicks}
              priority={true}
              width={466}
              height={96}
              alt=""
              className=""
            />
          </Link>
        </div>
        <ul className="hidden lg:flex mx-4 lg:w-[66.66666667%]">
          {menuItems.map((item, index) => (
            <li key={index}>
              <LocalizedClientLink
                href={item.url}
                data-testid="nav-pages-link"
                aria-label="Go to pages"
                key={index}
                className="mx-[0.625rem] text-sm text-[#44b865] whitespace-nowrap Poppins700"
              >
                {item.title}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
        <div className="flex justify-end items-center lg:w-[16.66666667%]">
          <Search />
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/account"
            data-testid="nav-account-link"
            aria-label="Go to accountpage"
          >
            <svg
              className="m-[0.313rem]"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 10C18.0222 10 16.0888 10.5865 14.4443 11.6853C12.7998 12.7841 11.5181 14.3459 10.7612 16.1732C10.0043 18.0004 9.8063 20.0111 10.1922 21.9509C10.578 23.8907 11.5304 25.6725 12.9289 27.0711C14.3275 28.4696 16.1093 29.422 18.0491 29.8078C19.9889 30.1937 21.9996 29.9957 23.8268 29.2388C25.6541 28.4819 27.2159 27.2002 28.3147 25.5557C29.4135 23.9112 30 21.9778 30 20C29.9971 17.3487 28.9425 14.8069 27.0678 12.9322C25.1931 11.0575 22.6513 10.0029 20 10ZM15.5157 26.3491C16.0316 25.6438 16.7064 25.0701 17.4856 24.6747C18.2648 24.2792 19.1262 24.0731 20 24.0731C20.8738 24.0731 21.7352 24.2792 22.5144 24.6747C23.2936 25.0701 23.9684 25.6438 24.4843 26.3491C23.1737 27.2785 21.6067 27.7777 20 27.7777C18.3933 27.7777 16.8263 27.2785 15.5157 26.3491ZM17.4074 19.2593C17.4074 18.7465 17.5595 18.2452 17.8443 17.8189C18.1292 17.3925 18.5341 17.0602 19.0079 16.864C19.4816 16.6678 20.0029 16.6164 20.5058 16.7165C21.0087 16.8165 21.4707 17.0634 21.8332 17.426C22.1958 17.7886 22.4427 18.2506 22.5428 18.7535C22.6428 19.2564 22.5915 19.7777 22.3952 20.2514C22.199 20.7251 21.8667 21.13 21.4404 21.4149C21.014 21.6998 20.5128 21.8518 20 21.8518C19.3124 21.8518 18.653 21.5787 18.1668 21.0925C17.6806 20.6063 17.4074 19.9469 17.4074 19.2593ZM26.1111 24.8093C25.3909 23.8933 24.473 23.152 23.4259 22.6407C24.0932 21.965 24.5458 21.107 24.7267 20.1747C24.9076 19.2424 24.8087 18.2774 24.4425 17.4011C24.0763 16.5248 23.4592 15.7764 22.6687 15.2501C21.8782 14.7237 20.9497 14.4428 20 14.4428C19.0503 14.4428 18.1218 14.7237 17.3313 15.2501C16.5409 15.7764 15.9237 16.5248 15.5575 17.4011C15.1913 18.2774 15.0924 19.2424 15.2733 20.1747C15.4542 21.107 15.9068 21.965 16.5741 22.6407C15.527 23.152 14.6091 23.8933 13.8889 24.8093C12.9843 23.6625 12.4209 22.2843 12.2631 20.8323C12.1053 19.3803 12.3596 17.9132 12.9968 16.599C13.634 15.2847 14.6283 14.1765 15.8661 13.401C17.1038 12.6256 18.5348 12.2144 19.9954 12.2144C21.4559 12.2144 22.887 12.6256 24.1247 13.401C25.3624 14.1765 26.3568 15.2847 26.994 16.599C27.6311 17.9132 27.8854 19.3803 27.7276 20.8323C27.5699 22.2843 27.0064 23.6625 26.1019 24.8093H26.1111Z"
                fill="#44B865"
              />
              <circle cx="20" cy="20" r="19" stroke="#44B865" strokeWidth="2" />
            </svg>
          </LocalizedClientLink>
          {/* <Suspense
            fallback={
              <LocalizedClientLink
                className="hover:text-ui-fg-base flex gap-2"
                href="/cart"
                data-testid="nav-cart-link"
              >
                Cart  (0)
              </LocalizedClientLink>
            }
          > */}
          <Suspense fallback={<div></div>}>
            <CartButton />
          </Suspense>

          {/* </Suspense> */}
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
