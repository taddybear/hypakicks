"use client"
import { redirect } from "next/navigation"
import { useState } from "react"
const NotFoundPage = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    close()
    redirect(`/shop?q=${searchQuery}`)
  }
  return (
    <>
      <div className="container px-3 py-8 ">
        <div className=" border-2 border-[#44b865]  rounded-[1.25rem] px-6 pb-6">
          <h1 className="text-center Poppins700 text-[2rem] text-[#44b865] py-[0.67em]">
            OOPS! THAT PAGE CAN’T BE FOUND.
          </h1>
          <p className="text-center pb-[1.5em] Poppins400">
            It looks like nothing was found at this location. Maybe try search?
          </p>
          <form onSubmit={onSubmit} className="relative">
            <input
              type="text"
              name=""
              id=""
              placeholder=""
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ring-0 focus:outline-none text-lg pl-2 Poppins400 text-[#666] placeholder:text-[#666] border-2 border-[#44b865] w-full rounded-[0.313rem] h-[2.875rem]"
            />
            <button
              type="submit"
              className="absolute right-0 bg-[#44b865] h-[2.875rem] Poppins600 rounded-r-[0.313rem] px-3 text-white text-lg	"
            >
              <div className="flex items-center space-x-1">
                <p>search</p>

                <svg
                  fill="#FFFFFF"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="20px"
                  height="20px"
                >
                  <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
export default NotFoundPage
