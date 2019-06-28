import { TableInfo } from '../table-info';

export class EditableType {
  name: 'String' | 'Number' | 'Date' | 'Autocomplete' | 'Table';
  info?: AutocompleteInfo | TableInfo; 
}


export class AutocompleteInfo {
  options: string[];
}