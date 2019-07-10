import { Component } from '@angular/core';
import * as Lodash from 'lodash';
// import { TableInfo } from './table/table-info';
// import { EditableType } from './table/editable-value/editable-type';

import { EditableType, TableInfo } from './data-table/editable-value/editable-type';
import { TableChange } from './data-table/data-table/data-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = [
    {
      supply: { id: 1, name: 'wood' },
      name: 'iron',
      quantity: 10,
      color: [
        { name: 'blue', darkness: 0.1, supply: { name: 'yellow' } },
        { name: 'yellow', darkness: 0.5, supply: { name: 'green' } }
      ],

    },
    {
      supply: { id: 2, name: 'glass' },
      name: 'gold',
      quantity: 12,
      color: [
        { name: 'red', darkness: 0.2, supply: { name: 'blue' } },
        { name: 'green', darkness: 0.7, supply: { name: 'red' } },
      ]
    },
  ];
  tableInfo = new TableInfo();

  constructor() {
    const colorTableInfo = new TableInfo();
    colorTableInfo.displayedColumns = ['supply', 'name', 'darkness'];
    colorTableInfo.columnNames = new Map([
      ['name', 'Name'],
      ['darkness', 'Darkness'],
      ['supply', 'Supply'],
    ]);
    colorTableInfo.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'Text' }],
      ['darkness', { name: 'Number' }],
      ['supply', {
        name: 'AutocompleteMap', info: {
          map: (value) => value.name, options: [{ name: 'red' }, { name: 'yellow' }, { name: 'green' }, { name: 'blue' }],
        }
      }]
    ]);

    this.tableInfo.displayedColumns = ['color', 'name', 'quantity'];
    this.tableInfo.columnNames = new Map([
      ['name', 'Name'],
      ['quantity', 'Quantity'],
      ['color', 'Color'],
    ]);
    this.tableInfo.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'Text' }],
      ['quantity', { name: 'Number' }],
      ['color', {
        name: 'Table', info: colorTableInfo,
      }]
    ]);
  }

  onTableChange(tableChange: TableChange) {
    console.log(tableChange);
  }
}
