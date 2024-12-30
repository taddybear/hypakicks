"use client"
import { Fragment, useCallback, useState } from "react"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { redirect } from "next/navigation"

const Search = () => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [video, setVideo] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const open = () => setVideo(true)
  const close = useCallback(() => {
    setVideo(false)
  }, [])

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
    open()
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    close()
    redirect(`/shop?q=${searchQuery}`)
  }

  return (
    <>
      <Popover className="relative h-full">
        <PopoverButton
          aria-label="Open search"
          data-testid="search-button"
          className="h-full flex items-center"
          onClick={openAndCancel}
        >
          <svg
            className="m-[0.313rem]"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="19" stroke="#44B865" strokeWidth="2" />
            <path
              d="M29.6707 28.0995L25.2786 23.7057C26.5955 21.9897 27.2103 19.8371 26.9983 17.6845C26.7864 15.5319 25.7635 13.5405 24.1372 12.1142C22.5109 10.688 20.403 9.93381 18.241 10.0046C16.079 10.0753 14.0249 10.9658 12.4954 12.4952C10.9658 14.0247 10.0753 16.0787 10.0046 18.2406C9.93381 20.4025 10.6881 22.5103 12.1143 24.1365C13.5406 25.7628 15.5321 26.7856 17.6848 26.9976C19.8375 27.2095 21.9903 26.5947 23.7064 25.2779L28.1021 29.6744C28.2054 29.7776 28.3279 29.8595 28.4628 29.9154C28.5977 29.9712 28.7423 30 28.8883 30C29.0343 30 29.1788 29.9712 29.3137 29.9154C29.4486 29.8595 29.5711 29.7776 29.6744 29.6744C29.7776 29.5712 29.8595 29.4486 29.9154 29.3137C29.9712 29.1789 30 29.0343 30 28.8883C30 28.7423 29.9712 28.5978 29.9154 28.4629C29.8595 28.328 29.7776 28.2055 29.6744 28.1022L29.6707 28.0995ZM12.2383 18.5268C12.2383 17.2831 12.6071 16.0672 13.2982 15.033C13.9892 13.9989 14.9714 13.1929 16.1206 12.7169C17.2697 12.2409 18.5342 12.1164 19.7541 12.359C20.9741 12.6017 22.0947 13.2006 22.9742 14.0801C23.8537 14.9596 24.4527 16.0801 24.6953 17.3C24.938 18.5199 24.8134 19.7843 24.3375 20.9334C23.8615 22.0825 23.0554 23.0647 22.0212 23.7557C20.987 24.4467 19.7711 24.8155 18.5272 24.8155C16.8598 24.8138 15.2612 24.1507 14.0822 22.9717C12.9031 21.7927 12.24 20.1942 12.2383 18.5268Z"
              fill="#44B865"
            />
          </svg>
        </PopoverButton>
        <Transition
          show={video}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="fixed w-full h-full top-0 inset-0 z-40 bg-black bg-opacity-80 text-black hover:text-black-black"
            data-testid="nav-cart-dropdown"
          >
            <button
              data-testid="close-search-button"
              onClick={close}
              className="text-transparent cursor-auto w-full h-full"
            >
              close
            </button>
            <div className="p-4 lg:px-10 lg:py-6 bg-white h-fit lg:w-auto fixed top-[40%] bottom-[40%] left-[5%] right-[5%] lg:right-[20%] lg:left-[20%] rounded-md ">
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-[2rem] Poppins600 text-[#44B865]">
                  Search Products
                </h1>
                <button
                  data-testid="close-search-button"
                  onClick={close}
                  className="h-12 w-12 flex items-center justify-center border-[#44B865] border-2 rounded-full"
                >
                  <p className="text-lg Poppins700 text-[#44B865]">X</p>
                </button>
              </div>
              <form
                onSubmit={onSubmit}
                className="relative mt-4 lg:mt-6 2xl:mt-8"
              >
                <input
                  type="text"
                  name="search-string"
                  id="search-string"
                  className="ring-0 focus:outline-none text-lg pl-2 Poppins400 text-[#666] placeholder:text-[#666] border-2 border-[#44b865] w-full rounded-[0.625rem] h-12 2xl:h-16"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  data-testid="search-button"
                  className="absolute Poppins500 right-0 bg-[#44b865] h-12 2xl:h-16 rounded-r-[0.625rem] px-2 text-white text-lg	"
                  type="submit"
                >
                  search
                </button>
              </form>
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>
    </>
  )
}

export default Search
