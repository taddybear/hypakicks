"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Mastercard from "../../../../../public/homepage/mastercard.jpg"
import { useRouter, usePathname, notFound } from "next/navigation"
import { retrieveCart } from "@lib/data/cart"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const router = useRouter()
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = useCallback(() => {
    setCartDropdownOpen(false)
  }, [])

  const handleRedirectUrl = () => {
    router.push(`http://localhost:8000/us/checkout?cart_id=${cartState?.id}`)
  }

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <>
      <Popover className="relative h-full">
        <PopoverButton
          aria-label="Open cart"
          data-testid="cart-button"
          className="h-full flex items-center"
          onClick={openAndCancel}
        >
          {/* <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/cart"
            data-testid="nav-cart-link"
          > */}
          {/* <button onClick={openAndCancel} className=" flex items-center"> */}
          <svg
            className="m-[0.313rem] "
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="19" stroke="#44B865" strokeWidth="2" />
            <path
              d="M29.7883 14.0673C29.6935 13.9334 29.5712 13.8249 29.4308 13.7501C29.2904 13.6754 29.1359 13.6364 28.9792 13.6364H14.4254L13.6908 10.7991C13.6313 10.5694 13.5034 10.3668 13.3265 10.2225C13.1496 10.0782 12.9335 10.0001 12.7113 10H11.0167C10.7471 10 10.4885 10.1149 10.2978 10.3195C10.1071 10.5241 10 10.8016 10 11.0909C10 11.3802 10.1071 11.6577 10.2978 11.8623C10.4885 12.0669 10.7471 12.1818 11.0167 12.1818H11.9386L14.8448 23.4082C14.9847 23.9439 15.2839 24.416 15.6968 24.7526C16.1098 25.0891 16.6139 25.2718 17.1324 25.2727H25.5053C26.0239 25.2718 26.528 25.0891 26.9409 24.7526C27.3538 24.416 27.653 23.9439 27.793 23.4082L29.9646 15.0191C30.0056 14.8566 30.0111 14.6861 29.9805 14.521C29.9499 14.3559 29.8842 14.2006 29.7883 14.0673ZM25.8273 22.8245C25.8077 22.9003 25.7657 22.9673 25.7076 23.0153C25.6496 23.0633 25.5786 23.0898 25.5053 23.0909H17.1307C17.0567 23.0908 16.9848 23.0647 16.9259 23.0166C16.8669 22.9685 16.8243 22.9011 16.8045 22.8245L14.9905 15.8182H27.6413L25.8273 22.8245ZM18.4728 28.1818C18.4728 28.5414 18.3735 28.8929 18.1873 29.1919C18.0011 29.4909 17.7364 29.724 17.4268 29.8616C17.1171 29.9992 16.7764 30.0352 16.4477 29.9651C16.119 29.8949 15.817 29.7217 15.58 29.4675C15.343 29.2132 15.1817 28.8892 15.1163 28.5365C15.0509 28.1838 15.0844 27.8183 15.2127 27.486C15.341 27.1538 15.5582 26.8698 15.8368 26.6701C16.1155 26.4703 16.4431 26.3636 16.7783 26.3636C17.2277 26.3636 17.6587 26.5552 17.9765 26.8962C18.2943 27.2371 18.4728 27.6996 18.4728 28.1818ZM27.2846 28.1818C27.2846 28.5414 27.1852 28.8929 26.999 29.1919C26.8128 29.4909 26.5482 29.724 26.2385 29.8616C25.9289 29.9992 25.5881 30.0352 25.2594 29.9651C24.9307 29.8949 24.6288 29.7217 24.3918 29.4675C24.1548 29.2132 23.9934 28.8892 23.928 28.5365C23.8626 28.1838 23.8962 27.8183 24.0245 27.486C24.1527 27.1538 24.3699 26.8698 24.6486 26.6701C24.9272 26.4703 25.2549 26.3636 25.59 26.3636C26.0395 26.3636 26.4705 26.5552 26.7883 26.8962C27.1061 27.2371 27.2846 27.6996 27.2846 28.1818Z"
              fill="#44B865"
            />
          </svg>
          {/* </button> */}

          {/* {`Cart (${totalItems})`} */}
          {/* </LocalizedClientLink> */}
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-250"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            // className="bg-[#f8f9fa] lg:h-[100vh] fixed top-0 right-0 bg-white w-[420px]"
            className="fixed w-full h-full top-0 inset-0 z-40 bg-black bg-opacity-80 text-black hover:text-black-black"
            data-testid="nav-cart-dropdown"
          >
            <button
              data-testid="close-cart-button"
              onClick={close}
              className="text-transparent cursor-auto	 w-full h-full"
            >
              close
            </button>
            <div className="bg-[#f8f9fa] h-[100vh] fixed top-0 right-0 bg-white w-[90vw] lg:w-[420px]">
              <div className="h-[8%] border-2 border-b-[#eee] bg-white shadow-sm p-4 relative flex items-center justify-center">
                <div className="flex items-center">
                  <div className="relative">
                    <svg
                      fill="#000000"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="40px"
                      height="40px"
                      viewBox="0 0 395.025 395.025"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path d="M357.507,380.982L337.914,82.223c-0.431-6.572-5.887-11.682-12.473-11.682h-54.69V62.5c0-34.462-28.038-62.5-62.5-62.5h-21.495c-34.462,0-62.5,28.038-62.5,62.5v8.041h-54.69c-6.586,0-12.042,5.11-12.473,11.682L37.45,381.709c-0.227,3.449,0.986,6.838,3.35,9.361c2.364,2.525,5.666,3.955,9.124,3.955h295.159c0.007,0,0.013,0,0.02,0c6.903,0,12.5-5.596,12.5-12.5C357.601,382.004,357.57,381.488,357.507,380.982z M149.255,62.5c0-20.678,16.822-37.5,37.5-37.5h21.495c20.678,0,37.5,16.822,37.5,37.5v8.041h-96.495V62.5z M63.27,370.025L81.272,95.542h42.983v11.154c-8.895,4.56-15,13.818-15,24.482c0,15.164,12.336,27.5,27.5,27.5s27.5-12.336,27.5-27.5c0-10.664-6.105-19.922-15-24.482V95.542h96.495v11.154c-8.896,4.56-15,13.818-15,24.482c0,15.164,12.336,27.5,27.5,27.5s27.5-12.336,27.5-27.5c0-10.664-6.105-19.922-15-24.482V95.542h42.983l18.002,274.483H63.27z" />
                      </g>
                    </svg>
                    <p className="absolute top-1 flex h-full w-full items-center justify-center">
                      {totalItems}
                    </p>
                  </div>
                  <h3 className="text-xl ml-2">Your Cart</h3>
                </div>
                <div className="absolute right-0 mr-3">
                  <div className="rounded-full border-2 border-[#44b865] ">
                    <button
                      data-testid="close-menu-button"
                      onClick={close}
                      // onClick={() => setCartDropdownOpen(false)}
                      className="px-[0.85rem] py-1.5 h-full w-full text-lg Poppins600"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
              {cartState && cartState.items?.length ? (
                <div className="bg-[#f8f9fa] h-[92%] flex flex-col justify-between ">
                  <div className="bg-[#f8f9fa] overflow-y-scroll grid grid-cols-1  no-scrollbar">
                    {cartState.items
                      .sort((a, b) => {
                        return (a.created_at ?? "") > (b.created_at ?? "")
                          ? -1
                          : 1
                      })
                      .map((item) => (
                        <div
                          className="items-center shadow-[0_2px_2px_rgba(0,0,0,0.05)] rounded-[0.313rem] bg-white my-[0.625rem] mx-[0.938rem] py-[0.625rem] px-[0.938rem] flex space-x-[0.938rem]"
                          key={item.id}
                          data-testid="cart-item"
                        >
                          <LocalizedClientLink
                            href={`/products/${item.product_handle}`}
                            className=""
                          >
                            <Image
                              src={item?.thumbnail || ""}
                              alt=""
                              width={85}
                              height={85}
                              className="object-cover"
                            />
                            {/* <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                            className="w-full"
                          /> */}
                          </LocalizedClientLink>
                          <div className="flex flex-col justify-between flex-1">
                            <div className="flex flex-col flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                  <h3 className="pb-2 text-base-regular overflow-hidden text-ellipsis">
                                    <LocalizedClientLink
                                      href={`/products/${item.product_handle}`}
                                      data-testid="product-link"
                                      className="Poppins600 text-base"
                                    >
                                      {item.subtitle}
                                    </LocalizedClientLink>
                                  </h3>

                                  <LineItemOptions
                                    variant={item.variant}
                                    data-testid="cart-item-variant"
                                    data-value={item.variant}
                                  />

                                  <div
                                    data-testid="cart-item-quantity"
                                    data-value={item.quantity}
                                    className="flex space-x-2 Poppins400 pt-2"
                                  >
                                    {item.quantity} X
                                    <p className="Poppins700 mx-2">
                                      {convertToLocale({
                                        amount: item.unit_price,
                                        currency_code: cartState.currency_code,
                                      })}
                                    </p>
                                    =
                                    <LineItemPrice
                                      item={item}
                                      style="tight"
                                      currencyCode={cartState.currency_code}
                                    />
                                  </div>
                                </div>
                                {/* <div className="flex justify-end">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div> */}
                              </div>
                            </div>
                            {/* <DeleteButton
                            id={item.id}
                            className="mt-1"
                            data-testid="cart-item-remove-button"
                          >
                            Remove
                          </DeleteButton> */}
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-1"
                            data-testid="cart-item-remove-button"
                          ></DeleteButton>
                        </div>
                      ))}
                  </div>
                  <div className="bg-white px-[1.875rem] pt-8 pb-4">
                    {/* <LocalizedClientLink href="/checkout?step=address" passHref> */}
                    <button
                      onClick={handleRedirectUrl}
                      data-testid="checkout-button"
                      className="py-[0.625rem] w-full uppercase bg-[#44b865] rounded-[0.313rem] Poppins600 text-lg	 text-white hover:bg-white hover:border-2 hover:border-[#44b865] hover:text-[#44b865]"
                    >
                      Checkout
                    </button>
                    {/* </LocalizedClientLink> */}
                    <Image
                      src={Mastercard}
                      alt=""
                      width={225}
                      height={39}
                      className="w-full mt-3"
                    />
                  </div>

                  {/* <div className="p-4 flex flex-col  text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="text-ui-fg-base font-semibold">
                      Subtotal{" "}
                      <span className="font-normal">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-large-semi"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  
                </div> */}
                </div>
              ) : (
                <div>
                  <div className=" h-[92%] flex flex-col p-[1.875rem] justify-center items-center">
                    <p className="text-center">Your cart is empty</p>
                    <LocalizedClientLink href="/shop">
                      <>
                        <span className="sr-only">Go to all products page</span>
                        <button
                          data-testid="return-shop-button"
                          onClick={close}
                          className="py-[0.625rem] px-6 mt-6  uppercase bg-[#44b865] rounded-[0.313rem] Poppins600 text-lg	 text-white hover:bg-white hover:border-2 hover:border-[#44b865] hover:text-[#44b865]"
                        >
                          RETURN TO SHOP
                        </button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              )}
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>
    </>
  )
}

export default CartDropdown
