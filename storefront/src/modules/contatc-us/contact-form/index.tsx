export default function ContactForm() {
  return (
    <section className="container px-3 lg:px-0">
      <h1 className="mb-5 leading-[2.5rem] lg:leading-[5rem] text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
        Write us a message
      </h1>

      <form action="">
        <div className="lg:flex w-full space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="lg:w-1/2 flex flex-col">
            <label htmlFor="" className="py-[0.313rem] text-[#888888] text-sm">
              Name
            </label>
            <input
              type="name"
              name=""
              id=""
              pattern="^(?!\s*$).+"
              required
              className="bg-[#F5F5F5] rounded-[0.625rem] p-[0.625rem]"
              aria-describedby="name-error"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col">
            <label htmlFor="" className="py-[0.313rem] text-[#888888] text-sm">
              Email
            </label>
            <input
              type="email"
              name=""
              id=""
              required
              className="bg-[#F5F5F5] rounded-[0.625rem] p-[0.625rem]"
            />
          </div>
        </div>
        <div className="flex flex-col mt-4 ">
          <label htmlFor="" className="py-[0.313rem] text-[#888888] text-sm">
            Message
          </label>
          <textarea
            name="message"
            required
            // pattern="^(?!\s*$).+"
            className="bg-[#F5F5F5] mb-6 rounded-[0.625rem] p-[0.625rem] h-36"
            style={{ padding: "0.625rem !important" }}
          ></textarea>
          <button
            type="submit"
            className="w-full Poppins600 bg-[#353535] text-[1.063rem] p-[0.938rem] rounded-[0.625rem] text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}
