import { Component } from '@angular/core';
import * as Lodash from 'lodash';
// import { TableInfo } from './table/table-info';
// import { EditableType } from './table/editable-value/editable-type';

import { EditableType, TableInfo, EditableTypeInfo } from './data-table/editable-value/editable-type';

import { Subject } from 'rxjs';
import { TableUpdate, TableDelete, TableInsert } from './data-table/data-table/data-table.component';

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
        { name: { name: 'Supply1' }, quantity: 1 },
      ],
      supplier: { name: 'Supplier1', phone: '0740000000' }
    }
  ];

  productOrderTI = new TableInfo();

  constructor() {
    const supplierInfo = [
      { name: 'name', type: 'Text' },
      { name: 'phone', type: 'Number' },
    ]

    const options = [
      { name: 'supply1' },
      { name: 'supply2' },
    ]
    const map = (value: any) => value.name;
    const remap = (originalValue: any, mappedValue: any) => options.find(option => map(option) === mappedValue);

    const suppliesInfo = [
      { name: 'name', type: 'Text', info: { map: map, remap: remap, options: options } },
      { name: 'quantity', type: 'Number' },
    ];

    const productOrderInfo = [
      { name: 'name', type: 'Text' },
      { name: 'data', type: 'Date' },
      { name: 'supplier', type: 'Object', info: supplierInfo },
      { name: 'supplies', type: 'Table', info: suppliesInfo },
    ];


    const supplierTI = new TableInfo();
    supplierTI.displayedColumns = ['name', 'phone'];
    supplierTI.columnNames = new Map([
      ['name', 'Name'],
      ['phone', 'Phone'],
    ]);
    supplierTI.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'Text' }],
      ['phone', { name: 'Number' }],
    ]);

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

    this.productOrderTI.displayedColumns = ['name', 'date', 'supplies', 'supplier'];
    this.productOrderTI.columnNames = new Map([
      ['name', 'Name'],
      ['date', 'Date'],
      ['supplies', 'Supplies'],
      ['supplier', 'Supplier']
    ]);
    this.productOrderTI.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'Text' }],
      ['date', { name: 'Date' }],
      ['supplies', { name: 'Table', info: suppliesTI }],
      ['supplier', { name: 'Object', info: supplierTI }],
    ]);




  }

  onModification(modification: any) {
    console.log(modification);
  }

}
