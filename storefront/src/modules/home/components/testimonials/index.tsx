import Image from "next/image"
import Rating from "../../../../../public/homepage/rating.avif"
import ImgOne from "../../../../../public/homepage/imgOne.webp"
import ImgTwo from "../../../../../public/homepage/imgTwo.webp"
import ImgThree from "../../../../../public/homepage/imgThree.webp"
import ShoeFour from "../../../../../public/homepage/shoeFour.jpeg"
import ShoeFive from "../../../../../public/homepage/shoeThree.jpg"
import ShoeSix from "../../../../../public/homepage/shoeFive.jpeg"
import UserOne from "../../../../../public/homepage/userOne.webp"
import UserTwo from "../../../../../public/homepage/userTwo.webp"
import UserThree from "../../../../../public/homepage/userThree.webp"
import UserFour from "../../../../../public/homepage/userFour.webp"

const Testimonials = () => {
  const SliderTwo = [
    {
      imgSrc: UserFour,
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
      imgSrc: UserOne, // Replace with actual image source
      ratingSrc: Rating, // Replace with actual rating source
      text: "My friends are jealous of my new sneakers! Thanks for the quick delivery",
    },
    {
      imgSrc: UserTwo, // Replace with actual image source
      ratingSrc: Rating, // Replace with actual rating source
      text: "Wearing feels like having art on your feet. Stylish, comfortable and always an eye-catcher",
    },
    {
      imgSrc: UserThree, // Replace with actual image source
      ratingSrc: Rating, // Replace with actual rating source
      text: "I'm addicted to the fresh drops from. Can't wait to see what's next!",
    },
  ]

  return (
    <>
      <div className="px-3 lg:px-0 container overflow-hidden">
        <h1 className="mb-5 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
          Testimonials
        </h1>

        {/* slider One */}
        <div className=" overflow-hidden w-full inline-flex flex-nowrap">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-0 [&_img]:max-w-none animate-infinite-scroll">
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover	"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover	"
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
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
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
                      src={ImgThree}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Shipping is super fast, I received my order within two days!
                  </p>
                </div>
              </div>
            </li>
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={UserOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover	"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover	"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={UserOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Offers a wide range of stylish sneakers, I always find
                    something I like! 🛍️
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    I can't recommend enough! They exceeded my expectations in
                    every way. 🌟
                  </p>
                </div>
              </div>
            </li>
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={UserThree}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover	"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover	"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={UserTwo}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery! 🎉
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgTwo}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Fast delivery, excellent quality and fantastic customer
                    service
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-0 [&_img]:max-w-none animate-infinite-scroll"
            aria-hidden="true"
          >
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={UserFour}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover	"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover	"
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
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    The attention to detail in products is unsurpassed. Simply
                    fantastic! 👌
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgThree}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Wearing feels like having art on your feet. Stylish,
                    comfortable and always an eye-catcher! 🎨👟
                  </p>
                </div>
              </div>
            </li>
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgTwo}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover	"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover	"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={UserThree}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    I'm addicted to the fresh drops from. Can't wait to see
                    what's next!🎉🆕
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Returning a pair was no problem with. Your customer service
                    is top notch! 📞✔️
                  </p>
                </div>
              </div>
            </li>
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgThree}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover	"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover	"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] object-cover	">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    'm addicted to the fresh drops from. Can't wait to see
                    what's next!🎉🆕
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Offers a wide range of stylish sneakers, I always find
                    something I like! 🛍️
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* slider Two */}
        <div className=" overflow-hidden	w-full inline-flex flex-nowrap">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-1 [&_img]:max-w-none animate-infinite-scroll-reverse">
            {SliderTwo.map((item, index) => (
              <li key={index} className="w-[50%] lg:w-[16.66%] m-[0.313rem]">
                <div className="bg-[#f2f2f2] p-[0.625rem] h-full rounded-[1.25rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={item.imgSrc}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={item.ratingSrc}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-1 [&_img]:max-w-none animate-infinite-scroll-reverse"
            aria-hidden="true"
          >
            {SliderTwo.map((item, index) => (
              <li key={index} className="w-[50%] lg:w-[16.66%] m-[0.313rem]">
                <div className="bg-[#f2f2f2] p-[0.625rem] h-full rounded-[1.25rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={item.imgSrc}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover	"
                    />
                    <Image
                      src={item.ratingSrc}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover	"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* slider Three */}
        <div className=" overflow-hidden w-full inline-flex flex-nowrap">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-0 [&_img]:max-w-none animate-infinite-scroll">
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover"
                />
              </div>
              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={UserFour}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    I'm addicted to the fresh drops from. Can't wait to see
                    what's next!🎉🆕
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={UserOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Wearing feels like having art on your feet. Stylish,
                    comfortable and always an eye-catcher! 🎨👟
                  </p>
                </div>
              </div>
            </li>
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={UserTwo}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover"
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
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Shipping is super fast, I received my order within two days!
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={UserThree}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Wearing feels like having art on your feet. Stylish,
                    comfortable and always an eye-catcher! 🎨👟
                  </p>
                </div>
              </div>
            </li>
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={UserFour}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={UserOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    I can't recommend enough! They exceeded my expectations in
                    every way. 🌟
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    My friends are jealous of my new sneakers! Thanks for the
                    quick delivery! 🎉
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-0 [&_img]:max-w-none animate-infinite-scroll"
            aria-hidden="true"
          >
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={UserOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover"
                />
              </div>
              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={UserTwo}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    The attention to detail in products is unsurpassed. Simply
                    fantastic! 👌
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgTwo}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Offers a wide range of stylish sneakers, I always find
                    something I like! 🛍️
                  </p>
                </div>
              </div>
            </li>
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={UserTwo}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={UserThree}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Offers a wide range of stylish sneakers, I always find
                    something I like! 🛍️
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={UserOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Returning a pair was no problem with. Your customer service
                    is top notch! 📞✔️
                  </p>
                </div>
              </div>
            </li>
            <li className="w-[100%] lg:w-[33.3%] flex mr-[0.625rem]">
              <div className="w-[50%] bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] h-full m-[0.313rem]">
                <div className="flex items-center mb-[0.625rem]">
                  <Image
                    src={ImgOne}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                  />
                  <Image
                    src={Rating}
                    alt=""
                    width={100}
                    height={20}
                    className="object-cover"
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
                  className="rounded-[1.25rem] h-[180px] w-full object-cover"
                />
              </div>

              <div className="w-[50%] lg:h-full">
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] m-[0.313rem]">
                  <div className="flex items-center mb-[0.625rem] ">
                    <Image
                      src={UserFour}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    Fast delivery, excellent quality and fantastic customer
                    service 💯
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-[0.625rem] rounded-[1.25rem] mt-[1.25rem] m-[0.313rem] ">
                  <div className="flex items-center mb-[0.625rem]">
                    <Image
                      src={ImgOne}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mr-1 h-[40px] w-[40px] object-cover"
                    />
                    <Image
                      src={Rating}
                      alt=""
                      width={100}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs mb-4 text-[#474747] Poppins400">
                    The attention to detail in products is unsurpassed. Simply
                    fantastic! 👌
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Testimonials
