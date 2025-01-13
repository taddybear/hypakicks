export type ActionType = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "normal" | "danger";
  disabled?: boolean;
  icon?: React.ReactNode;
};

export type ActionablesProps = {
  actions?: ActionType[];
  customTrigger?: React.ReactNode;
  forceDropdown?: boolean;
};
