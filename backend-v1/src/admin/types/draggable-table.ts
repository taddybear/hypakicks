export type DraggableTableProps = {
  entities: any[];
  setEntities: (entities: any[]) => void;
  onDelete?: (any) => void;
  columns: any[];
};
