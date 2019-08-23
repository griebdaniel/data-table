import { Component } from '@angular/core';
import * as Lodash from 'lodash';
// import { TableInfo } from './table/table-info';
// import { EditableType } from './table/editable-value/editable-type';

import { EditableType, ColumnInfo, TableInfo} from './data-table/editable-value/editable-type';

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

  productOrderInfo: TableInfo;

  constructor() {
    const supplierInfo: ColumnInfo = [
      { name: 'name', type: 'Text' },
      { name: 'phone', type: 'Number' },
    ]

    const options = [
      { name: 'Supply1' },
      { name: 'Supply2' },
    ];
    const map = (value: any) => value.name;
    const remap = (originalValue: any, mappedValue: any) => options.find(option => map(option) === mappedValue);

    const suppliesInfo: ColumnInfo = [
      { name: 'name', type: 'Text', info: { map: map, remap: remap, options: options } },
      { name: 'quantity', type: 'Number' },
    ];

    const productOrderColumnInfo: ColumnInfo = [
      { name: 'name', type: 'Text' },
      { name: 'date', type: 'Date' },
      { name: 'supplier', type: 'Object', info: supplierInfo },
      { name: 'supplies', type: 'Table', info: { columnInfo: suppliesInfo } },
    ];

    this.productOrderInfo  = { columnInfo: productOrderColumnInfo };
  }

  onModification(modification: any) {
    console.log(modification);
  }

}
