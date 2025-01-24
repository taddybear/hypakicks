"use client";

import { useState } from "react";
import Eye from "@modules/common/icons/eye";
import EyeOff from "@modules/common/icons/eye-off";
import { signup } from "@lib/data/customer";
import ErrorMessage from "@modules/checkout/components/error-message";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import { SubmitButton } from "@modules/checkout/components/submit-button";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [message, setMessage] = useState<string | null>(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setEmailError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdCustomer = await signup(null, new FormData(e.target as HTMLFormElement));

      if (typeof createdCustomer === "string" && createdCustomer.includes("email")) {
        setEmailError("This email is already registered.");
        setFormData((prev) => ({ ...prev, email: "" }));
        return;
      }

      console.log("User  registered successfully:", createdCustomer);
    } catch (error) {
      console.error("Signup failed:", error);
      setMessage("An error occurred during signup. Please try again.");
    }
  };

  return (
    <>
      <section className="px-3 container flex flex-col justify-center items-center">
        <h1 className="text-center uppercase mt-2 mb-3 text-[1.5rem] lg:text-[3.2rem] text-[#4D4D4D] Poppins700">
          MY ACCOUNT
        </h1>
        <h1 className="Poppins600 text-[#4D4D4D] text-xl lg:text-3xl text-center mb-3">
          Sign up
        </h1>
      </section>
      <form
        onSubmit={handleSubmit}
        className="px-3 w-full flex flex-col lg:w-1/2 m-auto"
      >
        <div className="flex flex-col w-full gap-y-2">
          <div className="lg:flex gap-4">
            <div className="flex flex-col space-y-1 w-full lg:w-1/2">
              <label htmlFor="first_name" className="mt-6 -mb-1 !text-base text-[#404040] Poppins500">
                First Name
              </label>
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                className="Poppins400 w-full bg-[#F5F5F5] rounded-md p-3"
                pattern="^(?!\s*$).+"
                autoComplete="given-name"
                data-testid="first-name-input"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full lg:w-1/2">
              <label htmlFor="last_name" className="mt-6 -mb-1 !text-base text-[#404040] Poppins500">
                Last Name
              </label>
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                className="Poppins400 bg-[#F5F5F5] rounded-md p-3"
                pattern="^(?!\s*$).+"
                autoComplete="family-name"
                data-testid="last-name-input"
              />
            </div>
          </div>
          <div className="lg:flex lg:space-x-4">
            <div className="flex flex-col space-y-1 w-full lg:w-1/2">
              <label htmlFor="email" className="mt-6 -mb-1 !text-base text-[#404040] Poppins500">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                type="email"
                autoComplete="email"
                data-testid="email-input"
                className={`Poppins400 bg-[#F5F5F5] rounded-md p-3 ${emailError ? "border border-red-500" : ""}`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div className="flex flex-col space-y-1 w-full lg:w-1/2">
              <label htmlFor="phone" className="mt-6 -mb-1 !text-base text-[#404040] Poppins500">
                Phone
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                type="number"
                pattern="^(?!\s*$).+"
                required
                autoComplete="tel"
                data-testid="phone-input"
                className="Poppins400 bg-[#F5F5F5] rounded-md p-3"
              />
            </div>
          </div>
          <label htmlFor="password" className="mt-6 -mb-1 !text-base text-[#404040] Poppins500">
            Password
          </label>
          <div className="relative w-full">
            <input
              name="password"
              type={inputType}
              value={formData.password}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
              data-testid="password-input"
              className="bg-[#F5F5F5] w-full rounded-md p-3"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        {message && <ErrorMessage error={message} data-testid="register-error" />}
        <span className="Poppins400 text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Medusa Store&apos;s{" "}
          <LocalizedClientLink href="/privacy-policy" className="underline">
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink href="/term-and-conditions" className="underline">
            Term and Conditions
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
        <button onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)} className="underline">
          Sign in
        </button>
        .
      </span>
    </>
  );
};

export default Register;