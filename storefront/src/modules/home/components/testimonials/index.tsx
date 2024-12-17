import Image from "next/image"
import Rating from "../../../../../public/homepage/rating.avif"
import ImgOne from "../../../../../public/homepage/imgOne.webp"
import ImgTwo from "../../../../../public/homepage/imgTwo.webp"
import ImgThree from "../../../../../public/homepage/imgThree.webp"
import ShoeFour from "../../../../../public/homepage/shoeFour.jpeg"
import ShoeFive from "../../../../../public/homepage/shoeThree.jpg"
import ShoeSix from "../../../../../public/homepage/shoeFive.jpeg"
import ShoeSeven from "../../../../../public/homepage/shoeSeven.jpeg"

const Testimonials = () => {
  const SliderTwo = [
    {
      imgSrc: ImgOne,
      ratingSrc: Rating,
      text: "I can't recommend enough! They exceeded my expectations in every way. 🌟",
    },
    {
      imgSrc: ImgTwo, // Replace with actual image source
      ratingSrc: Rating, // Replace with actual rating source
      text: "Fast delivery, excellent quality and fantastic customer service",
    },
    {
      imgSrc: ImgThree, // Replace with actual image source
      ratingSrc: Rating, // Replace with actual rating source
      text: "Shipping is super fast, I received my order within two days!",
    },
    {
      imgSrc: ImgOne, // Replace with actual image source
      ratingSrc: Rating, // Replace with actual rating source
      text: "My friends are jealous of my new sneakers! Thanks for the quick delivery",
    },
    {
      imgSrc: ImgOne, // Replace with actual image source
      ratingSrc: Rating, // Replace with actual rating source
      text: "Wearing feels like having art on your feet. Stylish, comfortable and always an eye-catcher",
    },
    {
      imgSrc: ImgOne, // Replace with actual image source
      ratingSrc: Rating, // Replace with actual rating source
      text: "I'm addicted to the fresh drops from. Can't wait to see what's next!",
    },
  ]

  return (
    <>
      <div className=" container">
        <h1 className="px-3 my-4  text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
          Testimonials
        </h1>

        {/* slider One */}
        <div className="mx-3 lg:mx-3 overflow-hidden">
          <div className="flex animate-[review-scroll-left_50s_linear_infinite]">
            <div className="shrink-0  w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px]"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className=""
                  />
                </div>
                <p className="mb-4 text-xs text-[#474747] Poppins400">
                  My friends are jealous of my new sneakers! Thanks for the
                  quick delivery!
                </p>
                <Image
                  src={ShoeSix}
                  alt=""
                  width={147}
                  height={180}
                  className="rounded-[1.25rem] h-[180px] w-full"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
              </div>
            </div>
            <div className="shrink-0  w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px]"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className=""
                  />
                </div>
                <p className="mb-4 text-xs text-[#474747] Poppins400">
                  My friends are jealous of my new sneakers! Thanks for the
                  quick delivery!
                </p>
                <Image
                  src={ShoeFive}
                  alt=""
                  width={147}
                  height={180}
                  className="rounded-[1.25rem] h-[180px] w-full"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
              </div>
            </div>
            <div className="shrink-0  w-[100%] lg:w-[33.3%] flex">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px]"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className=""
                  />
                </div>
                <p className="mb-4 text-xs text-[#474747] Poppins400">
                  My friends are jealous of my new sneakers! Thanks for the
                  quick delivery!
                </p>
                <Image
                  src={ShoeFour}
                  alt=""
                  width={147}
                  height={180}
                  className="rounded-[1.25rem] h-[180px] w-full"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
              </div>
            </div>
            {/* Duplicate */}

            <div className="shrink-0  w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px]"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className=""
                  />
                </div>
                <p className="mb-4 text-xs text-[#474747] Poppins400">
                  My friends are jealous of my new sneakers! Thanks for the
                  quick delivery!
                </p>
                <Image
                  src={ShoeSix}
                  alt=""
                  width={147}
                  height={180}
                  className="rounded-[1.25rem] h-[180px] w-full"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
              </div>
            </div>
            <div className="shrink-0  w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px]"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className=""
                  />
                </div>
                <p className="mb-4 text-xs text-[#474747] Poppins400">
                  My friends are jealous of my new sneakers! Thanks for the
                  quick delivery!
                </p>
                <Image
                  src={ShoeFive}
                  alt=""
                  width={147}
                  height={180}
                  className="rounded-[1.25rem] h-[180px] w-full"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
              </div>
            </div>
            <div className="shrink-0  w-[100%] lg:w-[33.3%] flex">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px]"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className=""
                  />
                </div>
                <p className="mb-4 text-xs text-[#474747] Poppins400">
                  My friends are jealous of my new sneakers! Thanks for the
                  quick delivery!
                </p>
                <Image
                  src={ShoeFour}
                  alt=""
                  width={147}
                  height={180}
                  className="rounded-[1.25rem] h-[180px] w-full"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* slider Two */}
        <div className="mx-3 lg:mx-3 overflow-hidden">
          <div className="flex lg:px-3 w-full mt-3 animate-[review-scroll-right_50s_linear_infinite]">
            {[...SliderTwo, ...SliderTwo].map((item, index) => (
              <div
                key={index}
                className="shrink-0  h-full w-[50%] lg:w-[16.66%] m-[0.313rem]"
              >
                <div className="bg-[#f2f2f2] p-[0.625rem] h-full rounded-[1.25rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={item.imgSrc}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={item.ratingSrc}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* slider Three */}
        <div className="mx-3 lg:mx-3 overflow-hidden">
          <div className="flex mt-3 lg:grid lg:grid-cols-3 animate-[review-scroll-left_60s_linear_infinite]">
            <div className="shrink-0  w-[100%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px]"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className=""
                  />
                </div>
                <p className="mb-4 text-xs text-[#474747] Poppins400">
                  My friends are jealous of my new sneakers! Thanks for the
                  quick delivery!
                </p>
                <Image
                  src={ShoeSeven}
                  alt=""
                  width={147}
                  height={180}
                  className="rounded-[1.25rem] h-[180px] w-full"
                />
              </div>

              <div className="shrink-0  lg:h-full w-[50%]">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
              </div>
            </div>
            <div className="shrink-0  w-[100%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px]"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className=""
                  />
                </div>
                <p className="mb-4 text-xs text-[#474747] Poppins400">
                  My friends are jealous of my new sneakers! Thanks for the
                  quick delivery!
                </p>
                <Image
                  src={ShoeSix}
                  alt=""
                  width={147}
                  height={180}
                  className="rounded-[1.25rem] h-[180px] w-full"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
              </div>
            </div>
            <div className="shrink-0  w-[100%]  flex">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px]"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className=""
                  />
                </div>
                <p className="mb-4 text-xs text-[#474747] Poppins400">
                  My friends are jealous of my new sneakers! Thanks for the
                  quick delivery!
                </p>
                <Image
                  src={ShoeFive}
                  alt=""
                  width={147}
                  height={180}
                  className="rounded-[1.25rem] h-[180px] w-full"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px]"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className=""
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonials
