import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Faq from "@modules/home/components/faq"
import StayUpdated from "@modules/home/stay-updated"
import Sustainability from "@modules/home/components/sustainability"
import Testimonials from "@modules/home/components/testimonials"
import BestSeller from "@modules/home/components/best-seller"

export const metadata: Metadata = {
  title: "Hypa Kicks",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home(props: {
  searchParams: any
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }
  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams
  const pageNumber = page ? parseInt(page) : 1

  const sort = sortBy || "created_at"

  return (
    <>
      <Hero />
      <BestSeller sortBy={sort} page={pageNumber} countryCode={countryCode} />
      <Testimonials />
      <Sustainability />
      <Faq />
      <StayUpdated />
      {/* <div className="py-12">
        <ul className="flex flex-col gap-x-6">
        </ul>
        </div> */}
      {/* <FeaturedProducts collections={collections} region={region} /> */}
    </>
  )
}
