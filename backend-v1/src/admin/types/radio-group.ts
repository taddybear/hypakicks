import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export type RadioGroupItemProps = {
  label: string;
  sublabel?: string;
  description?: string;
  disabledTooltip?: string;
} & RadioGroupPrimitive.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>;

export type RadioGroupSimpleItemProps = {
  label?: string;
  description?: string;
} & RadioGroupPrimitive.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>;
