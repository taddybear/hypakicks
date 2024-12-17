import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"
import StayUpdated from "@modules/home/stay-updated"
import Sustainability from "@modules/home/components/sustainability"
import Testimonials from "@modules/home/components/testimonials"
import Faq from "@modules/home/components/faq"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductParams = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <>
      {/* <div className="flex flex-col items-center text-center mb-16">
        <span className="text-base-regular text-gray-600 mb-6">
          Related products
        </span>
        <p className="text-2xl-regular text-ui-fg-base max-w-lg">
        You might also want to check out these products.
        </p>
        </div> */}
      <Testimonials />
      <Sustainability />
      <Faq />
      <StayUpdated />
      <h1 className="pb-2 text-[2rem] Poppins-500 container">
        Related products
      </h1>
      <ul className="container grid grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id} className="m-[0.313rem]">
            <Product region={region} product={product} />
          </li>
        ))}
      </ul>
    </>
  )
}
