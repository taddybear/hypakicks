import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import ImgOne from "../../../../../public/homepage/imgOne.webp"
import ImgTwo from "../../../../../public/homepage/imgTwo.webp"
import ImgThree from "../../../../../public/homepage/imgThree.webp"
import ImgFour from "../../../../../public/homepage/imgFour.webp"
import Shoe from "../../../../../public/homepage/shoe.webp"

const Hero = () => {
  return (
    <>
      <section className="container px-3">
        <div className="px-3 py-5">
          <h1 className=" text-[#4D4D4D] text-[2.5rem] leading-[2.5rem] lg:leading-[5.75rem] lg:text-[5.75rem] Poppins700 ">
            Discover Our <br />
            <span className="text-[#44b865] relative flex">
              Exclusive <br className="lg:hidden " /> Sneakers
              {/* Shoe rotate image */}
              <div className="hidden lg:block absolute top-20 lg:top-20 2xl:top-12 right-0 max-w-[55%]">
                <Image
                  src={Shoe}
                  alt=""
                  width={500}
                  height={287}
                  className="rotate-animation w-full"
                />
              </div>
            </span>
          </h1>

          <p className="mb-4 lg:text-[1.375rem] text-[#4D4D4D] PoppinsR ">
            Find your style with exclusive sneakers - only at Hypa Kicks.
          </p>
          <div className=" flex items-center space-x-2">
            <li className="Poppins700 text-xs text-[#44b865] border-2 border-[#44b865] rounded-[50px] uppercase px-5 py-2 list-none flex items-center ">
              <a href="" className=" whitespace-nowrap	">
                SHOP SNEAKERS
              </a>
              <svg
                width="100%"
                height="1.5em"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="rgb(68, 184, 101)"
              >
                <path
                  d="M6 12h12.5m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </li>
            <li className="Poppins700 text-xs text-[#44b865] border-2 border-[#44b865] rounded-[50px] uppercase px-5 py-2 list-none flex items-center ">
              <a href="" className="whitespace-nowrap	">
                About Us
              </a>
              <svg
                width="100%"
                height="1.5em"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="rgb(68, 184, 101)"
              >
                <path
                  d="M6 12h12.5m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </li>
          </div>
          <div className="flex mt-4">
            <Image
              src={ImgOne}
              alt=""
              width={40}
              height={40}
              className="rounded-full mr-1 border-[2px] border-[#44B865] h-[40px] w-[40px]"
            />
            <Image
              src={ImgTwo}
              alt=""
              width={40}
              height={40}
              className="rounded-full mr-1 border-[2px] border-[#44B865] h-[40px] w-[40px]"
            />
            <Image
              src={ImgThree}
              alt=""
              width={40}
              height={40}
              className="rounded-full mr-1 border-[2px] border-[#44B865] h-[40px] w-[40px]"
            />
            <Image
              src={ImgFour}
              alt=""
              width={40}
              height={40}
              className="rounded-full mr-1 border-[2px] border-[#44B865] h-[40px] w-[40px]"
            />
          </div>
          <p className="relative ml-[0.625rem] mb-5 leading-[2.313rem] lg:text-[0.9rem] text-[#666666]">
            Already trusted by 1.2k+ people
            <div className="lg:hidden absolute top-10 right-3">
              <Image
                src={Shoe}
                alt=""
                width={232}
                height={113}
                className="rotate-animation w-full"
              />
            </div>
          </p>

          <div className="w-[200px] h-[200px]"></div>
          {/* <iframe
            className="w-full aspect-video self-stretch md:min-h-96"
            src="https://www.youtube.com/embed/668nUCeBHyY"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Product Overview Video"
          /> */}
        </div>
      </section>
    </>
  )
}

export default Hero
