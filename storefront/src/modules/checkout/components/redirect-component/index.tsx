"use client"
import { setRedirectCartId, setCartOnRedirect } from "@lib/data/cart"
import { useEffect } from "react"

const RedirectComponent = ({ cartId }: any) => {
  useEffect(() => {
    setCartOnRedirect(cartId)
  }, [])

  return <div></div>
}

export default RedirectComponent
