export class EditableType {
  name: 'String' | 'Number' | 'Date' | 'Autocomplete' | 'Table';
  info?: AutocompleteInfo | TableInfo; 
}

export class AutocompleteInfo {
  options: string[];
}

export class TableInfo {
  displayedColumns: string[];
  columnNames: Map<string, string>;
  columnTypes: Map<string, EditableType>;
}

