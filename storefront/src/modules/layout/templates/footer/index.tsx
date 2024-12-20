import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import Link from "next/link"

import Hypakicks from "../../../../../public/homepage/hypakicks.webp"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <>
      <footer className="container px-3 lg:px-0 py-6">
        <Link href="/" className="w-[150px] lg:w-[200px] block">
          <Image
            aria-label="Go to homepage"
            src={Hypakicks}
            width={200}
            height={41}
            alt=""
            className=""
          />
        </Link>
        <p className="py-[0.625rem] text-[#474747] text-sm Poppins400">
          Find your new favorite sneakers with fast delivery and 24/7 support at
          Hypa Kicks.
        </p>
        <div className="flex">
          <div className="w-1/2 pt-6 pb-6">
            <h1 className="pb-[0.5rem] text-[#474747] Poppins700">
              Categories
            </h1>
            <ul>
              <li className="py-[0.625rem] text-[#474747] sm Poppins400 text-sm">
                <Link href="/shop">New Collection</Link>
              </li>
              <li className="text-sm Poppins400 text-[#474747]">
                <Link href="/shop">Summer Sales</Link>
              </li>
            </ul>
          </div>
          <div className="w-1/2 pt-6 pb-6 flex flex-col items-center justify-center">
            <ul>
              <li className="pb-[0.5rem] text-[#474747] Poppins700">
                Information
              </li>
              <li className="py-[0.625rem] text-[#474747] sm Poppins400 text-sm">
                <Link href="/about-us">About Us</Link>
              </li>
              <li className="pb-[0.625rem] text-[#474747] sm Poppins400 text-sm">
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li className="pb-[0.625rem] text-[#474747] sm Poppins400 text-sm">
                <Link href="/orders-tracking">Order Tracking</Link>
              </li>
              <li className="pb-[0.625rem] text-[#474747] sm Poppins400 text-sm">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="pb-[0.625rem] text-[#474747] sm Poppins400 text-sm">
                <Link href="/term-and-conditions">Term and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="py-[0.625rem] Poppins400 text-sm text-[#474747]">
          © 2024 Hypa Kicks. All rights reserved.
        </p>
      </footer>
    </>
    // <footer className="border-t border-ui-border-base w-full">
    //   <div className="content-container flex flex-col w-full">
    //     <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
    //       <div>
    //         <LocalizedClientLink
    //           href="/"
    //           className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
    //         >
    //           Medusa Store
    //         </LocalizedClientLink>
    //       </div>
    //       <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
    //         {productCategories && productCategories?.length > 0 && (
    //           <div className="flex flex-col gap-y-2">
    //             <span className="txt-small-plus txt-ui-fg-base">
    //               Categories
    //             </span>
    //             <ul
    //               className="grid grid-cols-1 gap-2"
    //               data-testid="footer-categories"
    //             >
    //               {productCategories?.slice(0, 6).map((c) => {
    //                 if (c.parent_category) {
    //                   return
    //                 }

    //                 const children =
    //                   c.category_children?.map((child) => ({
    //                     name: child.name,
    //                     handle: child.handle,
    //                     id: child.id,
    //                   })) || null

    //                 return (
    //                   <li
    //                     className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
    //                     key={c.id}
    //                   >
    //                     <LocalizedClientLink
    //                       className={clx(
    //                         "hover:text-ui-fg-base",
    //                         children && "txt-small-plus"
    //                       )}
    //                       href={`/categories/${c.handle}`}
    //                       data-testid="category-link"
    //                     >
    //                       {c.name}
    //                     </LocalizedClientLink>
    //                     {children && (
    //                       <ul className="grid grid-cols-1 ml-3 gap-2">
    //                         {children &&
    //                           children.map((child) => (
    //                             <li key={child.id}>
    //                               <LocalizedClientLink
    //                                 className="hover:text-ui-fg-base"
    //                                 href={`/categories/${child.handle}`}
    //                                 data-testid="category-link"
    //                               >
    //                                 {child.name}
    //                               </LocalizedClientLink>
    //                             </li>
    //                           ))}
    //                       </ul>
    //                     )}
    //                   </li>
    //                 )
    //               })}
    //             </ul>
    //           </div>
    //         )}
    //         {collections && collections.length > 0 && (
    //           <div className="flex flex-col gap-y-2">
    //             <span className="txt-small-plus txt-ui-fg-base">
    //               Collections
    //             </span>
    //             <ul
    //               className={clx(
    //                 "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
    //                 {
    //                   "grid-cols-2": (collections?.length || 0) > 3,
    //                 }
    //               )}
    //             >
    //               {collections?.slice(0, 6).map((c) => (
    //                 <li key={c.id}>
    //                   <LocalizedClientLink
    //                     className="hover:text-ui-fg-base"
    //                     href={`/collections/${c.handle}`}
    //                   >
    //                     {c.title}
    //                   </LocalizedClientLink>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         )}
    //         <div className="flex flex-col gap-y-2">
    //           <span className="txt-small-plus txt-ui-fg-base">Medusa</span>
    //           <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
    //             <li>
    //               <Link
    //                 href="https://github.com/medusajs"
    //                 target="_blank"
    //                 rel="noreferrer"
    //                 className="hover:text-ui-fg-base"
    //               >
    //                 GitHub
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 href="https://docs.medusajs.com"
    //                 target="_blank"
    //                 rel="noreferrer"
    //                 className="hover:text-ui-fg-base"
    //               >
    //                 Documentation
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 href="https://github.com/medusajs/nextjs-starter-medusa"
    //                 target="_blank"
    //                 rel="noreferrer"
    //                 className="hover:text-ui-fg-base"
    //               >
    //                 Source code
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
    //       <Text className="txt-compact-small">
    //         © {new Date().getFullYear()} Medusa Store. All rights reserved.
    //       </Text>
    //       <MedusaCTA />
    //     </div>
    //   </div>
    // </footer>
  )
}
