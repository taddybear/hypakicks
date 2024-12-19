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
          className="h-full flex items-center pb-[3.125rem]"
          onClick={openAndCancel}
        >
          <Image
            src={Thumbnail}
            alt=""
            width={300}
            height={219}
            className="mt-[10rem] lg:mt-4 rounded-md w-[250px] h-[183px] lg:w-[300] lg:h-[219]"
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
            className="fixed w-full h-full top-0 inset-0 z-20 bg-black bg-opacity-80 text-black hover:text-black-black"
            data-testid="nav-cart-dropdown"
          >
            <button
              onClick={close}
              className="text-transparent cursor-auto w-full h-full"
            >
              close
            </button>
            <div className="bg-white w-[90%] lg:w-auto flex items-center justify-center fixed top-[25%] bottom-[25%] left-[5%] right-[5%] lg:right-[25%] lg:left-[25%] rounded-md ">
              <iframe
                className="w-full aspect-video self-stretch md:min-h-88 py-6 px-6 lg:px-12"
                src="https://www.youtube.com/embed/668nUCeBHyY"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Product Overview Video"
              />
              <button
                onClick={close}
                className="absolute top-0 lg:pt-6 right-2 lg:right-4 text-lg Poppins700"
              >
                X
              </button>
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>
    </>
  )
}

export default Video
