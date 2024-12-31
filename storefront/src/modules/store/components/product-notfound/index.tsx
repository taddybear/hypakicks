import Link from "next/link"

const ProductsNotFound = () => {
  return (
    <>
      <div className="container px-3 py-8 ">
        <div className=" border-2 border-[#44b865]  rounded-[1.25rem] px-6 pb-6">
          <h1 className="text-center Poppins700 text-[2rem] text-[#44b865] py-[0.67em]">
            No results found
          </h1>
          <p className="text-center pb-[1.5em] Poppins400">
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
