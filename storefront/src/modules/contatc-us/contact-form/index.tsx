"use client"
import { useState } from "react"
export default function ContactForm() {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMessage(value)

    // Check if the input contains only spaces
    if (!value.trim()) {
      setError("Please enter some text, not just spaces.")
    } else {
      setError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) {
      setError("Please enter some text, not just spaces.")
      return
    }
    alert("Form submitted successfully!")
  }
  return (
    <section className="container px-3 lg:px-0">
      <h1 className="mb-5 leading-[2.5rem] lg:leading-[5rem] text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
        Write us a message
      </h1>

      <form onSubmit={handleSubmit}>
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
          <div className=" mb-6 w-full">
            <textarea
              name="message"
              required
              // pattern="^(?!\s*$).+"
              // pattern=".*\\S.*"
              onChange={handleChange}
              className="bg-[#F5F5F5] w-full rounded-[0.625rem] p-[0.625rem] h-36"
              style={{ padding: "0.625rem !important" }}
            ></textarea>
            {error && <p className="text-red-500">{error}</p>}
          </div>

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
