import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className="inline-block italic	 txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis"
    >
      <span className="Poppins600 text-black">size: </span>
      {variant?.title}
    </Text>
  )
}

export default LineItemOptions
