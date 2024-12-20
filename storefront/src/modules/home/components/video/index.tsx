"use client"
import { Fragment, useCallback, useState } from "react"
import Thumbnail from "../../../../../public/homepage/thumbnail.webp"
import Image from "next/image"
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"

const Video = () => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [video, setVideo] = useState(false)

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

  return (
    <>
      <Popover className="relative h-full">
        <PopoverButton
          aria-label="Open video"
          data-testid="video-button"
          className="h-full flex items-center"
          onClick={openAndCancel}
        >
          <Image
            src={Thumbnail}
            alt=""
            priority={true}
            width={250}
            height={183}
            className="mt-[10rem] lg:mt-4 rounded-[1rem] w-[250px] h-[183px] lg:w-[300] lg:h-[219]"
          />
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
            className="fixed w-full h-full top-0 inset-0 z-30 bg-black bg-opacity-80 text-black hover:text-black-black"
            data-testid="nav-cart-dropdown"
          >
            <button
              aria-label="Close video"
              data-testid="video-close-button"
              onClick={close}
              className="text-transparent cursor-auto w-full h-full"
            >
              close
            </button>
            <div className="bg-white lg:w-auto flex items-center justify-center fixed top-[20%] bottom-[20%] lg:top-[15%] lg:bottom-[15%] 2xl:top-[20%] 2xl:bottom-[20%] left-[5%] right-[5%] lg:right-[15%] lg:left-[15%] rounded-md ">
              <iframe
                className="w-full aspect-video self-stretch md:min-h-88 pt-16 pb-10 px-6 lg:px-12"
                src="https://www.youtube.com/embed/668nUCeBHyY"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Product Overview Video"
              />
              <button
                data-testid="close-search-button"
                onClick={close}
                className="absolute right-2 top-3 h-10 w-10 flex items-center justify-center border-[#44B865] border-2 rounded-full"
              >
                <p className="text-lg Poppins700 text-[#44B865] ">X</p>
              </button>
              {/* <button
                onClick={close}
                aria-label="Close video"
                data-testid="video-close-button"
                className="absolute top-0 lg:pt-6 right-2 lg:right-4 text-lg Poppins700"
              >
                X
              </button> */}
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>
    </>
  )
}

export default Video
