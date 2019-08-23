import { TableFeatures } from '../data-table/data-table.component';

export type EditableType = 'Text' | 'Number' | 'Date' | 'Object' | 'Table';

export class TextInfo {
  options?: any[];
  map?: (value: any) => string;
  remap?: (originalValue: any, mappedValue: string) => any;
}

export class TableInfo {
  columnInfo?: ColumnInfo;
  features?: TableFeatures;
}

export type ObjectInfo = ColumnInfo;

export type ColumnInfo = Array<{ name: string, type: EditableType, info?: TextInfo | ObjectInfo | TableInfo }>;

