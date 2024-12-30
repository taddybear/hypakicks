"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <>
      <section className="px-3 container flex flex-col justify-center items-center">
        <h1 className="text-center uppercase mt-2 mb-3 text-[1.5rem] lg:text-[3.2rem] text-[#4D4D4D] Poppins700">
          MY ACCOUNT
        </h1>
        <h1 className="Poppins600 text-[#4D4D4D] text-xl lg:text-3xl	text-center mb-3">
          Sign up
        </h1>
      </section>
      <form
        className="px-3 w-full flex flex-col lg:w-1/2 m-auto"
        action={formAction}
      >
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-1 w-1/2">
              <label
                htmlFor=""
                className="mt-6 -mb-1 !text-base text-[#404040] Poppins500"
              >
                First name
              </label>
              <input
                name="first_name"
                required
                autoComplete="given-name"
                data-testid="first-name-input"
                className="Poppins400 bg-[#F5F5F5] rounded-md p-3"
              />
              {/* <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          /> */}
            </div>
            <div className="flex flex-col space-y-1 w-1/2">
              <label
                htmlFor=""
                className="mt-6 -mb-1 !text-base text-[#404040] Poppins500"
              >
                Last name
              </label>
              <input
                name="last_name"
                required
                autoComplete="family-name"
                data-testid="last-name-input"
                className="Poppins400 bg-[#F5F5F5] rounded-md p-3"
              />
              {/* <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
            
            /> */}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-1 w-1/2">
              <label
                htmlFor=""
                className="mt-6 -mb-1 !text-base text-[#404040] Poppins500"
              >
                Email
              </label>
              <input
                name="email"
                required
                type="email"
                autoComplete="email"
                data-testid="email-input"
                className="Poppins400 bg-[#F5F5F5] rounded-md p-3"
              />
              {/* <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
            /> */}
            </div>
            <div className="flex flex-col space-y-1 w-1/2">
              <label
                htmlFor=""
                className="mt-6 -mb-1 !text-base text-[#404040] Poppins500"
              >
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                data-testid="phone-input"
                className="Poppins400 bg-[#F5F5F5] rounded-md p-3"
              />
              {/* <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          /> */}
            </div>
          </div>
          <label
            htmlFor=""
            className="mt-6 -mb-1 !text-base text-[#404040] Poppins500"
          >
            Password
          </label>
          <input
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
            className="bg-[#F5F5F5] rounded-md p-3"
          />
          {/* <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          /> */}
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="Poppins400 text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Medusa Store&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton
          className="text-[1.063rem] py-4 Poppins700 w-full mt-6"
          data-testid="register-button"
        >
          Sign up
        </SubmitButton>
      </form>
      <span className="Poppins400 mb-4 text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
      {/* <div
        className="max-w-sm flex flex-col items-center"
        data-testid="register-page"
      >
        <h1 className="text-large-semi uppercase mb-6">
          Become a Medusa Store Member
        </h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-4">
          Create your Medusa Store Member profile, and get access to an enhanced
          shopping experience.
        </p>
        
      </div> */}
    </>
  )
}

export default Register
