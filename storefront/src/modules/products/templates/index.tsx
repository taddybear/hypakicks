import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import StayUpdated from "@modules/home/stay-updated"
import Sustainability from "@modules/home/components/sustainability"
import Testimonials from "@modules/home/components/testimonials"
import Faq from "@modules/home/components/faq"
type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        // className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        className="container lg:flex "
        data-testid="product-container"
      >
        {/* <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div> */}

        <div className="mt-3 lg:mt-0 lg:w-1/2">
          <Image
            src={product?.thumbnail || ""}
            alt=""
            width={500}
            height={500}
            className="w-full"
          />
          {/* <ImageGallery images={product?.images || []} /> */}
        </div>
        <div className="flex flex-col small:sticky small:top-48 lg:w-1/2 px-3">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div className="space-y-12 my-12">
        <Testimonials />
        <Sustainability />
        <Faq />
        <StayUpdated />
      </div>
      <Suspense fallback={<SkeletonRelatedProducts />}>
        <RelatedProducts product={product} countryCode={countryCode} />
      </Suspense>
    </>
  )
}

export default ProductTemplate
