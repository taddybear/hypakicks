import { Metadata } from "next"
import { getBaseURL } from "@lib/util/env"
import "styles/globals.css"
import localFont from "next/font/local"

const Poppins400 = localFont({
  src: "../../public/fonts/Poppins-Regular.ttf",
  display: "swap",
  variable: "--font-Poppins400",
})

const Poppins700 = localFont({
  src: "../../public/fonts/Poppins-Bold.ttf",
  display: "swap",
  variable: "--font-Poppins700",
})
const Poppins600 = localFont({
  src: "../../public/fonts/Poppins-SemiBold.ttf",
  display: "swap",
  variable: "--font-Poppins600",
})

const Poppins300 = localFont({
  src: "../../public/fonts/Poppins-Light.ttf",
  display: "swap",
  variable: "--font-Poppins300",
})

const Poppins500 = localFont({
  src: "../../public/fonts/Poppins-Medium.ttf",
  display: "swap",
  variable: "--font-Poppins500",
})
export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${Poppins400.variable}`}>
      <body>
        <main
          className={`relative ${Poppins400.variable} ${Poppins500.variable} ${Poppins300.variable} ${Poppins700.variable} ${Poppins600.variable}`}
        >
          {props.children}
        </main>
      </body>
    </html>
  )
}
