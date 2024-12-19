export default function ContactForm() {
  return (
    <section className="container px-3">
      <h1 className="leading-[2.5rem] lg:leading-[5rem] my-4 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
        Write us a message
      </h1>

      <form action="">
        <div className="flex w-full space-x-6">
          <div className="w-1/2 flex flex-col">
            <label htmlFor="" className="py-[0.313rem] text-[#888888] text-sm">
              Name
            </label>
            <input
              type="text"
              name=""
              id=""
              className="bg-[#F5F5F5] rounded-[0.625rem] p-[0.625rem]"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <label htmlFor="" className="py-[0.313rem] text-[#888888] text-sm">
              Name
            </label>
            <input
              type="text"
              name=""
              id=""
              className="bg-[#F5F5F5] rounded-[0.625rem] p-[0.625rem]"
            />
          </div>
        </div>
        <div className=" flex flex-col ">
          <label htmlFor="" className="py-[0.313rem] text-[#888888] text-sm">
            Message
          </label>
          <textarea
            name="message"
            className="bg-[#F5F5F5] mb-6 rounded-[0.625rem] p-[0.625rem] h-36"
            style={{ padding: "0.625rem !important" }}
          ></textarea>
          <button className="w-full Poppins600 bg-[#353535] text-[1.063rem] p-[0.938rem] rounded-[0.625rem] text-white">
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}
