import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import { mapKeys } from "lodash"
import React, { useEffect, useMemo, useState } from "react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"
import Link from "next/link"
const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.address_2": cart?.shipping_address?.address_2 || "",
    // "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    // "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  // check if customer has saved addresses that are in the current region
  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        "shipping_address.address_2": address?.address_2 || "",
        // "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "",
        // "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }))

    email &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        email: email,
      }))
  }

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, cart?.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart]) // Add cart as a dependency

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )} */}
      <div className="flex items-center mb-4 justify-between">
        <h1 className="text-[1.313rem] Poppins600 ">Contact</h1>
        {/* <Link href="/account" className="underline text-sm">
          Login
        </Link> */}
      </div>
      <Input
        label="Email"
        name="email"
        type="email"
        title="Enter a valid email address."
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        required
        data-testid="shipping-email-input"
        className="Poppins400 px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
      />

      <h1 className="text-[1.313rem] Poppins600 mb-4 mt-8">Delivery</h1>
      <CountrySelect
        name="shipping_address.country_code"
        autoComplete="country"
        region={cart?.region}
        value={formData["shipping_address.country_code"]}
        onChange={handleChange}
        required
        data-testid="shipping-country-select"
        className="Poppins400 py-1 hover:bg-transparent bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
      />
      <div className="grid grid-cols-2 gap-5 my-4">
        <Input
          label="First name"
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData["shipping_address.first_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-first-name-input"
          className="Poppins400 px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
        />
        <Input
          label="Last name"
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData["shipping_address.last_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-last-name-input"
          className="Poppins400 px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
        />
      </div>

      <Input
        label="Address"
        name="shipping_address.address_1"
        autoComplete="address-line1"
        value={formData["shipping_address.address_1"]}
        onChange={handleChange}
        required
        data-testid="shipping-address-input"
        className="Poppins400 px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
      />
      <div className="mt-4">
        <Input
          label="Apartment, suite, etc."
          name="shipping_address.address_2"
          autoComplete="address-line1"
          value={formData["shipping_address.address_2"]}
          onChange={handleChange}
          data-testid="shipping-address-input"
          className="Poppins400 px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
        />
      </div>
      {/* <Input
        label="Company"
        name="shipping_address.company"
        value={formData["shipping_address.company"]}
        onChange={handleChange}
        autoComplete="organization"
        data-testid="shipping-company-input"
        className="px-2 bg-transparent border-[1px] border-[#DEDEDE] w-full h-11 rounded-md"
      /> */}
      <div className="grid grid-cols-2 gap-5 my-4">
        <Input
          label="City"
          name="shipping_address.city"
          autoComplete="address-level2"
          value={formData["shipping_address.city"]}
          onChange={handleChange}
          required
          data-testid="shipping-city-input"
          className="Poppins400 px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
        />
        <Input
          label="ZIP code"
          name="shipping_address.postal_code"
          autoComplete="postal-code"
          value={formData["shipping_address.postal_code"]}
          onChange={handleChange}
          required
          data-testid="shipping-postal-code-input"
          className="Poppins400 px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
        />
      </div>
      <div className="relative">
        <Input
          label="Phone number"
          name="shipping_address.phone"
          autoComplete="tel"
          value={formData["shipping_address.phone"]}
          onChange={handleChange}
          data-testid="shipping-phone-input"
          className="Poppins400 px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
        />
        <div className="absolute top-0 right-4 h-full flex items-center">
          <div className="relative group">
            <svg
              width="18"
              height="18"
              viewBox="0 0 6 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.75 3C5.75 4.51878 4.51878 5.75 3 5.75C1.48122 5.75 0.25 4.51878 0.25 3C0.25 1.48122 1.48122 0.25 3 0.25C4.51878 0.25 5.75 1.48122 5.75 3Z"
                stroke="#575757"
                strokeWidth="0.5"
              />
              <path
                d="M2.66331 3.97727V3.95597C2.66568 3.72988 2.68935 3.54995 2.73433 3.41619C2.77931 3.28243 2.84323 3.17412 2.92609 3.09126C3.00895 3.0084 3.10838 2.93205 3.22439 2.86222C3.29423 2.8196 3.35696 2.76929 3.4126 2.71129C3.46823 2.65211 3.51203 2.58404 3.54399 2.5071C3.57713 2.43016 3.59371 2.34493 3.59371 2.25142C3.59371 2.13542 3.56648 2.0348 3.51203 1.94957C3.45758 1.86435 3.38478 1.79865 3.29363 1.75249C3.20249 1.70632 3.10128 1.68324 2.99001 1.68324C2.89295 1.68324 2.79943 1.70336 2.70947 1.74361C2.61951 1.78385 2.54434 1.84718 2.48398 1.93359C2.42361 2.02 2.38869 2.13305 2.37922 2.27273H1.93177C1.94124 2.0715 1.99333 1.89927 2.08802 1.75604C2.1839 1.61281 2.30997 1.50331 2.46622 1.42756C2.62365 1.3518 2.79825 1.31392 2.99001 1.31392C3.19835 1.31392 3.37945 1.35535 3.53334 1.43821C3.6884 1.52107 3.80796 1.63471 3.892 1.77912C3.97723 1.92353 4.01984 2.08807 4.01984 2.27273C4.01984 2.40294 3.99972 2.52071 3.95947 2.62607C3.92041 2.73142 3.86359 2.82552 3.78902 2.90838C3.71563 2.99124 3.62685 3.06463 3.52268 3.12855C3.41852 3.19366 3.33506 3.26231 3.27233 3.33452C3.20959 3.40554 3.16402 3.49018 3.13561 3.58842C3.1072 3.68667 3.09181 3.80919 3.08944 3.95597V3.97727H2.66331ZM2.89058 5.02841C2.80299 5.02841 2.72782 4.99704 2.66508 4.9343C2.60235 4.87157 2.57098 4.7964 2.57098 4.70881C2.57098 4.62121 2.60235 4.54605 2.66508 4.48331C2.72782 4.42057 2.80299 4.3892 2.89058 4.3892C2.97818 4.3892 3.05334 4.42057 3.11608 4.48331C3.17881 4.54605 3.21018 4.62121 3.21018 4.70881C3.21018 4.76681 3.19539 4.82008 3.16579 4.86861C3.13738 4.91714 3.09891 4.9562 3.05038 4.9858C3.00303 5.0142 2.94977 5.02841 2.89058 5.02841Z"
                fill="#575757"
              />
            </svg>
            <div className="Popppins400 absolute text-center w-[8rem] bottom-full lg:left-1/2 transform -translate-x-[80%] lg:-translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs px-3 py-2 rounded shadow-lg">
              Send me updates about my order! Message and data rates apply. View
              our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      </div>
      {/* <Input
        label="State / Province"
        name="shipping_address.province"
        autoComplete="address-level1"
        value={formData["shipping_address.province"]}
        onChange={handleChange}
        data-testid="shipping-province-input"
        className="px-2 bg-transparent border-[1px] border-[#DEDEDE] w-full h-11 rounded-md"
      /> */}
      {/* <div className="my-8">
        <Checkbox
          label="Billing address same as shipping address"
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
      </div> */}
      {/* <div className="grid grid-cols-2 gap-4 mb-4"></div> */}
    </>
  )
}

export default ShippingAddress
