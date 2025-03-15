import React, { useState, useEffect } from "react"
import { SubmitButton } from "@modules/checkout/components/submit-button"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")
    const email = queryParams.get("email")

    if (token && email) {
      setToken(token)
      setEmail(email)
      setIsTokenValid(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!password || !confirmPassword) {
      setMessage("Both fields are required.")
      return
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.")
      return
    }

    try {
      const response = await fetch(
        `${process.env.MEDUSA_BACKEND_URL}/auth/customer/emailpass/update?token=${token}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await response.json()
      setMessage(
        data.success
          ? "Password reset successfully! You can now log in."
          : "Couldn't reset password. Please try again."
      )
    } catch (error) {
      console.error(error)
      setMessage("An error occurred while resetting your password.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Reset Your Password
        </h1>

        {message && (
          <p className="text-sm text-center mb-4 text-red-500">{message}</p>
        )}

        {isTokenValid ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <SubmitButton className="text-[1.063rem] py-4 w-full">
              Reset Password
            </SubmitButton>
          </form>
        ) : (
          <p className="text-center text-gray-600">
            Invalid or expired token. Please request a new password reset.
          </p>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
