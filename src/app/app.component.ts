import { Component } from '@angular/core';
import * as Lodash from 'lodash';
// import { TableInfo } from './table/table-info';
// import { EditableType } from './table/editable-value/editable-type';

import { EditableType, TableInfo } from 'data-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = [
    {
      name: 'iron', quantity: 10, color: [
        { name: 'blue', darkness: 0.1 },
        { name: 'yellow', darkness: 0.5 }
      ]
    },
    {
      name: 'gold', quantity: 12, color: [
        { name: 'red', darkness: 0.2 },
        { name: 'green', darkness: 0.7 }
      ]
    },
    // { name: 'solver', quantity: 51 },
    // { name: 'bronze', quantity: 2 },
    // { name: 'wood', quantity: 4 },
    // { name: 'copper', quantity: 17 },
    // { name: 'leather', quantity: 35 },
    // { name: 'platinum', quantity: 78 },
    // { name: 'plastic', quantity: 34 },
    // { name: 'glass', quantity: 1 },
  ];
  tableInfo = new TableInfo();

  constructor() {
    const colorTableInfo = new TableInfo();
    colorTableInfo.displayedColumns = ['name', 'darkness'];
    colorTableInfo.columnNames = new Map([
      ['name', 'Name'],
      ['darkness', 'Darkness']
    ]);
    colorTableInfo.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'String' }],
      ['darkness', { name: 'Number' }]
    ]);

    this.tableInfo.displayedColumns = ['name', 'quantity', 'color'];
    this.tableInfo.columnNames = new Map([
      ['name', 'Name'],
      ['quantity', 'Quantity'],
      ['color', 'Color']
    ]);
    this.tableInfo.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'String' }],
      ['quantity', { name: 'Number' }],
      ['color', { name: 'Table', info: colorTableInfo }]
    ]);


  }
}
