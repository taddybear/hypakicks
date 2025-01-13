import { ActionType } from "./actionable";

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  forceDropdown?: boolean;
  actions?: ActionType[];
  linkTo?: string;
};

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  linkTo?: string;
  name?: string;
};

export type TableProps = {
  immediateSearchFocus?: boolean;
  containerClassName?: string;
} & React.HTMLAttributes<HTMLTableElement>;

export type TableElement<T> = React.ForwardRefExoticComponent<T> &
  React.RefAttributes<unknown>;

export type TableType = {
  Head: TableElement<React.HTMLAttributes<HTMLTableSectionElement>>;
  HeadRow: TableElement<React.HTMLAttributes<HTMLTableRowElement>>;
  HeadCell: TableElement<React.ThHTMLAttributes<HTMLTableCellElement>>;
  Body: TableElement<React.HTMLAttributes<HTMLTableSectionElement>>;
  Row: TableElement<TableRowProps>;
  Cell: TableElement<TableCellProps>;
} & TableElement<TableProps>;
