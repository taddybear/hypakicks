import Image from "next/image"
import ImgOne from "../../../../../public/homepage/imgOne.webp"
import ImgTwo from "../../../../../public/homepage/imgTwo.webp"
import ImgThree from "../../../../../public/homepage/imgThree.webp"
import ImgFour from "../../../../../public/homepage/imgFour.webp"
import Shoe from "../../../../../public/homepage/shoe.webp"
import HomeGrid from "../../../../../public/homepage/homegrid.webp"
import Video from "../video"
import Link from "next/link"

const Hero = () => {
  return (
    <>
      <section className="container px-3 lg:px-0">
        <div className="pt-5">
          <h1 className=" text-[2.5rem] leading-[2.5rem] text-[#4D4D4D] lg:leading-[5.75rem] lg:text-[5.75rem] Poppins700 ">
            Discover Our <br />
            <span className="text-[#44b865] relative flex">
              {/* Text with z-index 20 */}
              <span className="z-20 relative">
                Exclusive <br className="lg:hidden" /> Sneakers
              </span>

              {/* Background image with z-index 10 */}
              <div
                className="hidden w-[590px] h-[287px] lg:block absolute z-10 top-20 lg:top-20 2xl:top-12 right-0 max-w-[55%]"
                style={{
                  backgroundImage: `url(${HomeGrid.src})`,
                  backgroundPosition: "center",
                  backgroundSize: "auto",
                }}
              ></div>

              {/* Rotating image with z-index 30 */}
              <div className="hidden lg:block absolute z-30 top-20 lg:top-20 2xl:top-12 right-0">
                <Image
                  src={Shoe}
                  priority={true}
                  alt="Shoe Image"
                  width={590}
                  height={287}
                  className="rotate-animation lg:w-[590px] lg:h-[287px]"
                />
              </div>
            </span>
          </h1>

          <p className="mb-4 lg:text-[1.375rem] text-[#4D4D4D] Poppins400">
            Find your style with exclusive sneakers - only at Hypa Kicks.
          </p>
          <ul className=" flex items-center space-x-2">
            <li className="Poppins700 text-xs text-[#44b865] border-2 border-[#44b865] rounded-[50px] uppercase px-5 py-2 list-none flex items-center ">
              <Link
                href="/shop"
                aria-label="Go to shoppage"
                className=" whitespace-nowrap	"
              >
                SHOP SNEAKERS
              </Link>
              <svg
                width="100%"
                height="2em"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="rgb(68, 184, 101)"
              >
                <path
                  d="M6 12h12.5m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </li>
            <li className="Poppins700 text-xs text-[#44b865] border-2 border-[#44b865] rounded-[50px] uppercase px-5 py-2 list-none flex items-center ">
              <Link
                href="/about-us"
                aria-label="Go to aboutpage"
                className="whitespace-nowrap	"
              >
                About Us
              </Link>
              <svg
                width="100%"
                height="2em"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="rgb(68, 184, 101)"
              >
                <path
                  d="M6 12h12.5m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </li>
          </ul>
          <div className="flex mt-4">
            <Image
              src={ImgOne}
              alt=""
              priority={true}
              width={40}
              height={40}
              className="rounded-full mr-1 border-[2px] border-[#44B865] h-[40px] w-[40px]"
            />
            <Image
              src={ImgTwo}
              alt=""
              priority={true}
              width={40}
              height={40}
              className="rounded-full mr-1 border-[2px] border-[#44B865] h-[40px] w-[40px]"
            />
            <Image
              src={ImgThree}
              alt=""
              priority={true}
              width={40}
              height={40}
              className="rounded-full mr-1 border-[2px] border-[#44B865] h-[40px] w-[40px]"
            />
            <Image
              src={ImgFour}
              alt=""
              priority={true}
              width={40}
              height={40}
              className="rounded-full mr-1 border-[2px] border-[#44B865] h-[40px] w-[40px]"
            />
          </div>
          <div className="Poppins400 relative mb-5 leading-[2.313rem] lg:text-[0.9rem] text-[#666666]">
            <span className="z-20 relative">
              Already trusted by 1.2k+ people
            </span>
            <div
              className="w-[232px] h-[113px] lg:hidden absolute z-10 top-10 right-3 max-w-[55%]"
              style={{
                backgroundImage: `url(${HomeGrid.src})`,
                backgroundPosition: "center",
                backgroundSize: "auto",
              }}
            ></div>
            <div className="lg:hidden absolute z-30 top-10 right-3">
              <Image
                src={Shoe}
                alt=""
                priority={true}
                width={232}
                height={113}
                className="rotate-animation w-full w-[232px] h-[113px]"
              />
            </div>
          </div>

          <Video />
        </div>
      </section>
    </>
  )
}

export default Hero
