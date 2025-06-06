"use client"
import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useCallback, useEffect, useState } from "react"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const toggleState = useToggleState()
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

  const open = () => setCartDropdownOpen(true)
  const openAndCancel = () => {
    open()
  }

  const close = useCallback(() => {
    setCartDropdownOpen(false)
  }, [])

  useEffect(() => {
    if (cartDropdownOpen) {
      document.body.classList.add("h-[100vh]", "overflow-y-hidden")
    } else {
      document.body.classList.remove("h-[100vh]", "overflow-y-hidden")
    }
  }, [cartDropdownOpen])
  return (
    <div className="lg:hidden h-full mr-[0.625rem]">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          <>
            <div className="relative flex h-full">
              <Popover.Button
                aria-label="Open navigation menu"
                data-testid="nav-menu-button"
                className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                onClick={openAndCancel}
              >
                <div className="px-2 py-1.5 rounded-full border-2 border-[#44b865]">
                  <div className="w-[20px] h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      focusable="false"
                      viewBox="0 0 24 24"
                      color="var(--token-720cfe3b-5389-4478-9f37-cf225f3a4f1a, rgb(68, 184, 101))"
                      style={{
                        userSelect: "none",
                        width: "100%",
                        height: "100%",
                        display: "inline-block",
                        fill: "var(--token-720cfe3b-5389-4478-9f37-cf225f3a4f1a, rgb(68, 184, 101))",
                        flexShrink: 0,
                      }}
                    >
                      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                  </div>
                </div>
              </Popover.Button>
            </div>

            <Transition
              show={cartDropdownOpen}
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100 backdrop-blur-2xl"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 backdrop-blur-2xl"
              leaveTo="opacity-0"
            >
              <PopoverPanel
                className="bg-white w-[78%] p-6 border-r flex flex-col z-[99999] absolute top-0 h-[100vh] sm:min-w-min z-30 inset-x-0 text-sm backdrop-blur-2xl"
                style={{
                  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div>
                  <div className="flex justify-between">
                    <h1 className="text-xl text-[#404040]	py-[0.625rem] Poppins600">
                      Mobile Menu
                    </h1>
                    <div className=" rounded-full border-2 border-[#44b865] ">
                      <button
                        aria-label="close menu"
                        data-testid="close-menu-button"
                        onClick={close}
                        className="px-4 py-1.5 text-[#44b865] h-full w-full text-lg Poppins600"
                      >
                        X
                      </button>
                    </div>
                  </div>
                  <ul className="flex flex-col mt-[0.625rem]">
                    {menuItems.map((items, index) => (
                      <li key={index} className="mb-[0.8rem]">
                        <LocalizedClientLink
                          data-testid="nav-home-link"
                          aria-label="Go to homepage"
                          href={items.url}
                          className=" text-[#44b865] text-sm Poppins600"
                        >
                          <button onClick={close} className="w-full text-start">
                            {items.title}
                          </button>
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full  rounded-rounded justify-between p-6"
                  > */}
                {/* <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div> */}
                {/* <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-3xl leading-10 hover:text-ui-fg-disabled"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul> */}
                {/* <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} Medusa Store. All rights
                        reserved.
                      </Text>
                    </div> */}
                {/* </div> */}
              </PopoverPanel>
            </Transition>
          </>
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
