import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"
import { redirect } from "next/navigation"

import { useActionState, useEffect, useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)
  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState("password")

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState)
    setInputType((prevState) =>
      prevState === "password" ? "text" : "password"
    )
  }

  const forgotPassword = () => {
    redirect(`/reset-password`)
  }
  return (
    <>
      <section className="px-3 container flex flex-col justify-center items-center">
        <h1 className="text-center uppercase mt-2 mb-3 text-[1.5rem] lg:text-[3.2rem] text-[#4D4D4D] Poppins700">
          MY ACCOUNT
        </h1>
        <h1 className="Poppins600 text-[#4D4D4D] text-xl lg:text-3xl	text-center mb-3">
          Login
        </h1>
      </section>
      <form
        className="px-3 mt-4 lg:mt-0 w-full lg:w-1/2 m-auto"
        action={formAction}
      >
        <div className="flex flex-col w-full ">
          <label htmlFor="" className="!text-base  text-[#404040] Poppins500">
            Username or email address
          </label>
          <input
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
            className="Poppins400 bg-[#F5F5F5] rounded-md p-3"
          />

          <label
            htmlFor=""
            className="mt-6 -mb-1 !text-base text-[#404040] Poppins500"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              name="password"
              type={inputType}
              autoComplete="current-password"
              required
              data-testid="password-input"
              className="!bg-[#F5F5F5] w-full rounded-md p-3 !focus:outline-none border-[#F5F5F5]"
            />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                handleTogglePassword()
              }}
              className="absolute top-0 right-3 h-full items-center flex"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {/* <div className="flex justify-end">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                forgotPassword()
              }}
              className="text-sm mt-1 Poppins600"
            >
              Forgot Password
            </button>
          </div> */}
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton
          data-testid="sign-in-button"
          className="text-[1.063rem] py-4 Poppins700 w-full mt-6"
        >
          Log in
        </SubmitButton>
      </form>
      <span className="Poppins400 mb-4 lg:mb-0 lg:w-1/2 m-auto text-center text-ui-fg-base text-small-regular mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </>
  )
}

export default Login
