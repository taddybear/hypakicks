"use client"
import Image from "next/image"
import showOne from "../../../../../public/homepage/shoeOne.jpeg"
import showTwo from "../../../../../public/homepage/shoeTwo.jpeg"
import showThree from "../../../../../public/homepage/shoeThree.jpg"
import { useEffect, useState } from "react"

const Sustainability = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const data = [
    {
      svg: (
        <svg
          width={50}
          height={50}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          focusable="false"
        >
          <g>
            <path d="M96,208a8,8,0,0,1-8,8H40a24,24,0,0,1-20.77-36l34.29-59.25L39.47,124.5A8,8,0,1,1,35.33,109l32.77-8.77a8,8,0,0,1,9.8,5.66l8.79,32.77A8,8,0,0,1,81,148.5a8.37,8.37,0,0,1-2.08.27,8,8,0,0,1-7.72-5.93l-3.8-14.15L33.11,188A8,8,0,0,0,40,200H88A8,8,0,0,1,96,208Zm140.73-28-23.14-40a8,8,0,0,0-13.84,8l23.14,40A8,8,0,0,1,216,200H147.31l10.34-10.34a8,8,0,0,0-11.31-11.32l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.31-11.32L147.31,216H216a24,24,0,0,0,20.77-36ZM128,32a7.85,7.85,0,0,1,6.92,4l34.29,59.25-14.08-3.78A8,8,0,0,0,151,106.92l32.78,8.79a8.23,8.23,0,0,0,2.07.27,8,8,0,0,0,7.72-5.93l8.79-32.79a8,8,0,1,0-15.45-4.14l-3.8,14.17L148.77,28a24,24,0,0,0-41.54,0L84.07,68a8,8,0,0,0,13.85,8l23.16-40A7.85,7.85,0,0,1,128,32Z"></path>
          </g>
        </svg>
      ),
      title: "Made with recycled materials",
      description:
        "Each pair of Trendy Kicks is crafted from upcycled components, including rubber, plastic, and fabric.",
    },
    {
      svg: (
        <svg
          width={50}
          height={50}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          focusable="false"
        >
          <g>
            <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z"></path>
          </g>
        </svg>
      ),
      title: "Reducing Waste in Production",
      description:
        "By adopting efficient manufacturing techniques and reducing excessive packaging, we significantly lower our environmental impact.",
    },
    {
      svg: (
        <svg
          width={50}
          height={50}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          focusable="false"
        >
          <g>
            <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z"></path>
          </g>
        </svg>
      ),
      title: "Ethical and Sustainable Practices",
      description:
        "Ethical practices are at the heart of our business, every step of production aligns with our core values of environmental care.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <div className="container px-3">
        <div className="px-3">
          <h1 className="mt-4 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
            Sustainability
          </h1>
          <div className="lg:flex lg:space-x-10 items-center bg-[#ededed] p-5 rounded-[1.25rem] my-4">
            <div className="lg:w-1/2 mb-[1.25rem] lg:mb-0">
              <Image
                src={
                  activeImageIndex === 0
                    ? showOne
                    : activeImageIndex === 1
                    ? showTwo
                    : showThree
                }
                alt=""
                width={200}
                height={200}
                className="w-full h-[300px] lg:h-[500px] rounded-[0.625rem]"
              />
            </div>
            <div className="lg:w-1/2 space-y-[0.625rem]">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`text-[#404040] flex items-center space-x-[8px] p-[0.625rem] rounded-[0.625rem] ${
                    index === activeImageIndex
                      ? "bg-white opacity-100"
                      : "filter blur-[2px] opacity-60"
                  }`}
                >
                  {item.svg}
                  <div>
                    <h2 className="text-lg lg:text-[1.563rem] Poppins600">
                      {item.title}
                    </h2>
                    <p className="text-[0.813rem] lg:text-[1.063rem] Poppins300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sustainability
