import Link from "next/link"

const ProductsNotFound = () => {
  return (
    <>
      <div className="container px-3 lg:px-0 py-8">
        <div className=" border-2 border-[#44b865]  rounded-[1.25rem] px-6 py-8">
          <h1 className="text-center Poppins700 text-[2rem] text-[#44b865] pb-5">
            No results found
          </h1>
          <p className="text-center Poppins400">
            You can still view our
            <Link href="/shop" className="underline ml-1">
              entire catalog
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ProductsNotFound
