import PayPalSvg from "../../../../../public/svgs/paypal-svg"

export default function ExpressCheckout() {
  return (
    <>
      <h1 className=" text-center text-sm text-[#707070] Poppins400">
        Express checkout
      </h1>
      <div className="flex space-x-3 w-full mt-4">
        {/* <button className="bg-[#592FF4] w-1/2 py-2 rounded-md space-x-1 flex items-center justify-center">
          <p className="text-white Poppins600 text-lg">shop</p>
          <p className="text-[#592FF4] bg-white text-xs p-[0.125rem] px-[0.25rem] rounded-sm">
            Pay
          </p>
        </button>
        <button className="bg-[#ffc439] w-1/2 py-2 rounded-md space-x-1 flex items-center justify-center">
          <div className="w-20 h-auto">
            <PayPalSvg />
          </div>
        </button> */}
      </div>
      <div className="flex items-center my-4 mb-8">
        <div className="bg-[#eee] h-[1px] w-1/2"></div>
        <p className="mx-2 text-[#707070]">OR</p>
        <div className="bg-[#eee] h-[1px] w-1/2"></div>
      </div>
    </>
  )
}
