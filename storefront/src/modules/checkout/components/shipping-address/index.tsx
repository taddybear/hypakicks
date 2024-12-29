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
        className="px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
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
      <Input
        label="Phone"
        name="shipping_address.phone"
        autoComplete="tel"
        value={formData["shipping_address.phone"]}
        onChange={handleChange}
        data-testid="shipping-phone-input"
        className="Poppins400 px-4 pt-7 pb-2 bg-transparent border-[1px] border-[#DEDEDE] w-full rounded-md"
      />
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
