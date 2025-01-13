import React, { useState, useEffect } from "react"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const [isTokenValid, setIsTokenValid] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")
    const email = queryParams.get("email")

    if (token && email) {
      setToken(token)
      setEmail(email)
      setIsTokenValid(true)
    } else {
      setIsTokenValid(false)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!password) {
      alert("Password is required")
      return
    }

    try {
      const response = await fetch(
        `https://hypakicks-production.up.railway.app/auth/customer/emailpass/update?token=${token}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()
      if (data.success) {
        alert("Password reset successfully!")
      } else {
        alert("Couldn't reset password.")
      }
    } catch (error) {
      console.error(error)
      alert("An error occurred while resetting your password.")
    }
  }

  return (
    <div>
      <h1>Reset Your Password</h1>
      {isTokenValid ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Enter new password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      ) : (
        <p>
          Invalid or expired token. Please try requesting a new password reset
          link.
        </p>
      )}
    </div>
  )
}

export default ResetPassword
