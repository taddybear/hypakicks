export type ButtonProps = {
  variant: "primary" | "secondary" | "ghost" | "danger" | "nuclear";
  size?: "small" | "medium" | "large";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
