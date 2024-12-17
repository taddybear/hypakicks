import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { getProductPrice } from "@lib/util/get-product-price"
import PreviewPrice from "@modules/products/components/product-preview/price"

export default async function BestSellerPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <>
      <div>
        <Image
          src={product.thumbnail || ""}
          alt=""
          width={268}
          height={268}
          className="h-[179px] w-[179px] lg:h-[268px] lg:w-[268px]"
        />
        <p className="my-[0.625rem] text-[#474747] Poppins400">
          {product.title}
        </p>
        <p className="text-[1.063rem] text-[#474747] Poppins700">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </p>
      </div>
    </>
  )
}

// export default BestSellerPreview
