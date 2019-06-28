import { EditableType } from './editable-value/editable-type';

export class TableInfo {
  displayedColumns: string[];
  columnNames: Map<string, string>;
  columnTypes: Map<string, EditableType>;
}
