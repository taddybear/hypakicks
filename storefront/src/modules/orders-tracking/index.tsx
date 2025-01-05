export default function OrdersTracking() {
  return (
    <>
      <section className="container px-3 lg:px-0 pb-[1.5em]">
        <h1 className="text-center my-4 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
          Order Tracking
        </h1>

        <form action="" className="relative">
          <input
            type="text"
            name=""
            id=""
            placeholder="Tracking Number"
            className="ring-0 focus:outline-none text-lg pl-2 Poppins400 text-[#666] placeholder:text-[#666] border-2 border-[#44b865] w-full rounded-[0.625rem] h-[2.875rem]"
          />
          <button className="absolute flex items-center top-0 right-0 bg-[#44b865] h-[2.875rem] rounded-r-[0.625rem] px-4 text-white text-lg	">
            <span>
              <svg
                fill="#FFFFFF"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
              >
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
              </svg>
            </span>
            <span>Track</span>
          </button>
        </form>

        <form action="" className="pt-8 lg:w-[70%] lg:m-auto">
          <div className="lg:flex space-y-5 lg:space-y-0 gap-8">
            <input
              type="email"
              className="focus:ring-0 focus:outline-none px-4 py-3 w-full border-[#dddddd] border-2"
              placeholder="Your email"
              required
              pattern="^(?!\s*$).+"
            />
            <input
              type="text"
              className="focus:ring-0 focus:outline-none w-full px-4 py-3 border-[#dddddd] border-2"
              placeholder="Order ID"
              required
              pattern="^(?!\s*$).+"
            />
          </div>
          <div className="relative w-full mt-5">
            <input
              type="text"
              className="focus:ring-0 focus:outline-none px-4 py-3 w-full border-[#dddddd] border-2 rounded-r-[0.3rem]"
              placeholder="Tracking number(*required)"
              required
              pattern="^(?!\s*$).+"
            />

            <button className="absolute right-0 top-0 bg-red-600  h-full flex items-center space-x-[2px] rounded-r-[0.3rem] rounded-l-[0.3rem] px-4 md:px-10 text-white text-lg">
              <span>
                <svg
                  fill="#FFFFFF"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="20px"
                  height="20px"
                >
                  <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
                </svg>
              </span>
              <span>Track</span>
            </button>
          </div>
          <p className="mt-8 text-gray-500 Poppins400">
            Please click button Track to track your order
          </p>
        </form>
      </section>
    </>
  )
}
