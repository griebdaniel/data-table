import { EventEmitter } from '@angular/core';
import { TextInfo, TableInfo } from './editable-type';

export default interface EditableValue {
  value: string | number | Date | object | object[];
  typeInfo: TableInfo | TextInfo;
  save: EventEmitter<any>;
  cancel: EventEmitter<any>;
  modified?: EventEmitter<any>;
  open: boolean;
}