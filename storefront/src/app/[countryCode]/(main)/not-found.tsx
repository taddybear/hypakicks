import { Metadata } from "next"
import InteractiveLink from "@modules/common/components/interactive-link"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <>
      <Nav />

      <div className="container px-3 py-8 ">
        <div className=" border-2 border-[#44b865]  rounded-[1.25rem] px-6 pb-6">
          <h1 className="text-center Poppins700 text-[2rem] text-[#44b865] py-[0.67em]">
            OOPS! THAT PAGE CAN’T BE FOUND.
          </h1>
          <p className="text-center pb-[1.5em] Poppins400">
            It looks like nothing was found at this location. Maybe try search?
          </p>
          <form action="" className="relative">
            <input
              type="text"
              name=""
              id=""
              placeholder=""
              className="ring-0 focus:outline-none text-lg pl-2 Poppins400 text-[#666] placeholder:text-[#666] border-2 border-[#44b865] w-full rounded-[0.313rem] h-[2.875rem]"
            />
            <button className="absolute right-0 bg-[#44b865] h-[2.875rem] Poppins600 rounded-r-[0.313rem] px-3 text-white text-lg	">
              Search
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
    // <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
    //   <h1 className="text-2xl-semi text-ui-fg-base">Page not found</h1>
    //   <p className="text-small-regular text-ui-fg-base">
    //     The page you tried to access does not exist.
    //   </p>
    //   <InteractiveLink href="/">Go to frontpage</InteractiveLink>
    // </div>
  )
}
