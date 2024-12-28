import { setCartId } from "@lib/data/cookies"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cartId = searchParams.get("cart_id")

  if (cartId) {
    setCartId(cartId)
  }
}
