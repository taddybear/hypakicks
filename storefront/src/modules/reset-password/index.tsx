"use client"
import ResetPassword from "@modules/account/components/reset-password"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import React, { useState, FormEvent, useEffect } from "react"

const RequestResetPassword = () => {
  const [email, setEmail] = useState("")
  const [isResetPage, setIsResetPage] = useState(false)

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(window.location.search)
  //   const token = queryParams.get("token")
  //   const emailFromUrl = queryParams.get("email")

  //   if (token && emailFromUrl) {
  //     setIsResetPage(true)
  //   }
  // }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      alert("Email is required")
      return
    }

    fetch(
      `https://hypakicks-production.up.railway.app/auth/customer/emailpass/reset-password`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
        }),
      }
    ).then(() => {
      alert(
        "If an account exists with the specified email, it'll receive instructions to reset the password."
      )
    })
  }

  return (
    <>
      <div>
        {isResetPage ? (
          <ResetPassword />
        ) : (
          <>
            <form
              className="my-10 lg:my-20 px-3 w-full lg:w-1/2 m-auto"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full ">
                <label
                  htmlFor=""
                  className="!text-base  text-[#404040] Poppins500"
                >
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  data-testid="email-input"
                  className="Poppins400 bg-[#F5F5F5] rounded-md p-3"
                />
              </div>
              <SubmitButton
                data-testid="sign-in-button"
                className="text-[1.063rem] py-4 Poppins700 w-full mt-6"
              >
                Submit
              </SubmitButton>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default RequestResetPassword
