const StayUpdated = () => {
  return (
    <>
      <section className="container pt-[0.625rem] px-3 lg:px-3">
        <div
          className="my-[1.25rem] py-10 px-5 rounded-[2rem] text-white flex flex-col items-center "
          style={{
            backgroundImage: "linear-gradient(180deg, #44b865, #434343)",
          }}
        >
          <h1 className="text-[2.188rem] lg:text-[3.438rem] leading-tight  Poppins500">
            Stay Updated
          </h1>
          <p className="text-sm	 lg:text-[1.063rem] py-5 mb-[1.5em] text-center Poppins500">
            Sign up for our newsletter and be the first to know about the latest
            news, exclusive content, and special offers.
            <br />
            Join our community today and stay informed!
          </p>

          <form action="" className="flex flex-col w-full">
            <input
              type="text"
              className="p-3 rounded-[0.625rem] mb-[0.625rem] w-full lg:w-[30%] m-auto"
              placeholder="Enter your email"
              required
            />
            <button className="hover:bg-[#353535] bg-[#44b865] Poppins600 text-[1.063rem] w-full lg:w-[30%] m-auto text-white p-[0.938rem] rounded-[0.625rem]">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default StayUpdated
