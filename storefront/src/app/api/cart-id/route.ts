import { getCacheTag, removeCartId, setCartId } from "@lib/data/cookies"
import { type NextRequest, NextResponse } from "next/server"
import { cookies as nextCookies } from "next/headers"
import { revalidateTag } from "next/cache"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cartId = searchParams.get("cart_id")
  console.log("Route: ", cartId)
  if (cartId) {
    //   // await removeCartId()
    await setCartId(cartId)
    const cartCacheTag = await getCacheTag("carts")
    revalidateTag(cartCacheTag)
  }
  //   const cookies = await nextCookies()
  //   cookies.set("test_cookie", "some_value", {
  //     // maxAge: -1,
  //   })
  //   // cookies.set("_medusa_cart_id", cartId, {
  //   //   maxAge: 60 * 60 * 24 * 7,
  //   //   httpOnly: true,
  //   //   sameSite: "none",
  //   //   secure: process.env.NODE_ENV === "production",
  //   // })
  // }

  // // return Response.json({ cart_id: cartId })
  // const nextResponse = NextResponse.json({
  //   headers: request.headers,
  // })
  // nextResponse.cookies.set("<your-cookie-key>", "<your-cookie-value>")

  // return nextResponse
}
