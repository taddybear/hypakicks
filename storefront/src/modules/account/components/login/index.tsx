import { login } from "@lib/data/customer";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import Input from "@modules/common/components/input";
import Eye from "@modules/common/icons/eye";
import EyeOff from "@modules/common/icons/eye-off";
import { redirect } from "next/navigation";
import { useState } from "react";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
    setInputType((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  const forgotPassword = () => {
    redirect("/reset-password");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    if (name === "password") {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    try {
        const signedinCustomer = await login(null, new FormData(e.target as HTMLFormElement));

        if (typeof signedinCustomer === "string" && signedinCustomer.includes("password")) {
            setPasswordError("This password is incorrect. Please try again.");
            setFormData((prev) => ({ ...prev, password: "" }));
            return;
        }

        // Handle successful login
        // console.log("User signed in successfully:", signedinCustomer);

    } catch (error) {
        console.error("Signin failed:", error);
        setMessage("An error occurred during login. Please try again.");
    }
};


  return (
    <>
      <section className="px-3 container flex flex-col justify-center items-center">
        <h1 className="text-center uppercase mt-2 mb-3 text-[1.5rem] lg:text-[3.2rem] text-[#4D4D4D] Poppins700">
          MY ACCOUNT
        </h1>
        <h1 className="Poppins600 text-[#4D4D4D] text-xl lg:text-3xl text-center mb-3">
          Login
        </h1>
      </section>

      <form onSubmit={handleSubmit} className="px-3 mt-4 lg:mt-0 w-full lg:w-1/2 m-auto">
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="!text-base text-[#404040] Poppins500">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
            className="Poppins400 bg-[#F5F5F5] rounded-md p-3"
          />

          <label htmlFor="password" className="mt-6 -mb-1 !text-base text-[#404040] Poppins500">
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={inputType}
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              required
              data-testid="password-input"
              className="!bg-[#F5F5F5] w-full rounded-md p-3 !focus:outline-none border-[#F5F5F5]"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleTogglePassword();
              }}
              className="absolute top-0 right-3 h-full items-center flex"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        <ErrorMessage error={passwordError || message} data-testid="login-error-message" />

        {/* Submit Button */}
        <SubmitButton
          data-testid="sign-in-button"
          className="text-[1.063rem] py-4 Poppins700 w-full mt-6"
        >
          Log in
        </SubmitButton>
      </form>

      {/* Register Link */}
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
  );
};

export default Login;
