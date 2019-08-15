import { Component } from '@angular/core';
import * as Lodash from 'lodash';
// import { TableInfo } from './table/table-info';
// import { EditableType } from './table/editable-value/editable-type';

import { EditableType, TableInfo, EditableTypeInfo } from './data-table/editable-value/editable-type';
import { TableChange, TableUpdate } from './data-table/data-table/data-table.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  saveConfirmation = new Subject<boolean>();
  data = [
    {
      name: 'Order1',
      date: new Date(),
      supplies: [
        { name: { name: 'supply1' }, quantity: 1 },
      ]
    }
  ];

  productOrderTI = new TableInfo();

  constructor() {
    const suppliesTI = new TableInfo();

    suppliesTI.displayedColumns = ['name', 'quantity'];
    suppliesTI.columnNames = new Map([
      ['name', 'Name'],
      ['quantity', 'Quantity'],
    ]);
    suppliesTI.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'AutocompleteMap', info: { map: (value) => value.name, options: [{ name: 'supply1' }, { name: 'supply2' }] } }],
      ['quantity', { name: 'Number' }],
    ]);

    this.productOrderTI.displayedColumns = ['name', 'date', 'supplies'];
    this.productOrderTI.columnNames = new Map([
      ['name', 'Name'],
      ['date', 'Date'],
      ['supplies', 'Supplies'],
    ]);
    this.productOrderTI.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'Text' }],
      ['date', { name: 'Date' }],
      ['supplies', { name: 'Table', info: suppliesTI }],
    ]);


  }

  onUpdate(update: TableUpdate) {
    console.log('updated', update);
    this.saveConfirmation.next(true);
  }

  onInsert(row: object) {
    console.log('insert', row);
  }

  onDelete(rows: object[]) {
    console.log('delete', rows);
  }
}
