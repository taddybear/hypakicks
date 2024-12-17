export default function OrdersTracking() {
  return (
    <>
      <section className="container px-3">
        <h1 className="text-center  my-4 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
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
          <button className="absolute right-0 bg-[#44b865] h-[2.875rem] rounded-r-[0.625rem] px-2 text-white text-lg	">
            Track
          </button>
        </form>
      </section>
    </>
  )
}
