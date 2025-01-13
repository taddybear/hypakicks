import * as RadixTooltip from "@radix-ui/react-tooltip";

export type TooltipProps = RadixTooltip.TooltipContentProps &
  Pick<
    RadixTooltip.TooltipProps,
    "open" | "defaultOpen" | "onOpenChange" | "delayDuration"
  > & {
    content: React.ReactNode;
    side?: "bottom" | "left" | "top" | "right";
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  };
