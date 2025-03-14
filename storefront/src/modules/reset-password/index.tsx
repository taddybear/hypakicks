"use client"
import ResetPassword from "@modules/account/components/reset-password"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import React, { useState, useEffect } from "react"

const RequestResetPassword = () => {
  const [email, setEmail] = useState("")
  const [isResetPage, setIsResetPage] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")
    const emailFromUrl = queryParams.get("email")

    if (token && emailFromUrl) {
      setIsResetPage(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      alert("Email is required")
      return
    }

    const response = await fetch(
      `${process.env.MEDUSA_BACKEND_URL}/auth/customer/emailpass/reset-password`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email }),
      }
    )

    if (response.ok) {
      setIsEmailSent(true)
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div>
      {isResetPage ? (
        <ResetPassword />
      ) : isEmailSent ? (
        <div className="text-center py-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Password reset link has been sent!
          </h2>
          <p className="text-gray-500">
            Please check your email for instructions to reset your password.
          </p>
        </div>
      ) : (
        <form
          className="my-10 lg:my-20 px-3 w-full lg:w-1/2 m-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full">
            <label className="!text-base text-[#404040] Poppins500">
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
      )}
    </div>
  )
}

export default RequestResetPassword
