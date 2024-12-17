import { listProductsWithSort } from "@lib/data/products"
import BestSellerPreview from "./best-seller-preview"
import { getRegion } from "@lib/data/regions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import ProductPreview from "@modules/products/components/product-preview"

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}
export default async function BestSeller({
  countryCode,
  sortBy,
  page,
}: {
  sortBy?: SortOptions
  page: number
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }
  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })
  return (
    <>
      <section className="container px-3">
        <div className="flex justify-between items-center">
          <h1 className="leading-[2.5rem] my-4 text-[2.5rem] lg:text-[4.375rem] text-[#4D4D4D] Poppins700">
            Best
            <span className="text-[#44B865]">
              <br className="lg:hidden" />
              sellers
            </span>
          </h1>
          <div>
            <li className="Poppins700 text-xs text-[#44b865] border-2 border-[#44b865] rounded-[50px] uppercase px-5 py-2 list-none flex items-center">
              <a href="/shop" className=" whitespace-nowrap	">
                VIEW BEST SELLERS
              </a>
              <svg
                width="100%"
                height="1.5em"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="rgb(68, 184, 101)"
              >
                <path
                  d="M6 12h12.5m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </li>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {products.map((p) => {
            return (
              <li key={p.id} className="list-none m-[0.313rem]">
                <BestSellerPreview product={p} region={region} />
              </li>
            )
          })}
        </div>
      </section>
    </>
  )
}
