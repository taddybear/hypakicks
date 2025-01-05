import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-3 w-[60%] lg:w-[20%]">
      <select
        data-testid={dataTestId}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className=" focus:outline-none Poppins400 p-[0.625rem] bg-white text-base text-[#404040] border-[1px] border-[#ccc] bg-[#EFEFEF] rounded-[0.313rem]  hover:cursor-pointer "
      >
        {items?.map((i) => (
          <option
            key={i.value}
            value={i.value}
            className="Poppins400 text-ui-fg-subtle bg-white"
          >
            {i.label}
          </option>
        ))}
      </select>
    </div>
    // <div className="flex gap-x-3 flex-col gap-y-3">
    //   <Text className="txt-compact-small-plus text-ui-fg-muted">{title}</Text>
    //   <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
    //     {items?.map((i) => (
    //       <div
    //         key={i.value}
    //         className={clx("flex gap-x-2 items-center", {
    //           "ml-[-23px]": i.value === value,
    //         })}
    //       >
    //         {i.value === value && <EllipseMiniSolid />}
    //         <RadioGroup.Item
    //           checked={i.value === value}
    //           className="hidden peer"
    //           id={i.value}
    //           value={i.value}
    //         />
    //         <Label
    //           htmlFor={i.value}
    //           className={clx(
    //             "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
    //             {
    //               "text-ui-fg-base": i.value === value,
    //             }
    //           )}
    //           data-testid="radio-label"
    //           data-active={i.value === value}
    //         >
    //           {i.label}
    //         </Label>
    //       </div>
    //     ))}
    //   </RadioGroup>
    // </div>
  )
}

export default FilterRadioGroup
