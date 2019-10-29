import { Component } from '@angular/core';
import { ColumnType, TableOptions } from 'data-table';

@Component({
  selector: 'gdr-lib-test',
  templateUrl: './lib-test.component.html',
  styleUrls: ['./lib-test.component.scss']
})
export class LibTestComponent {

  data = [
    {
      name: undefined,
      date: new Date(),
      supplies: [
        { name: { name: 'Supply1' }, quantity: 1, expensive: false },
      ],
      supplier: { name: 'Supplier1', phone: '0740000000', addresses: ['address1', 'address2'] }
    }
  ];

  productOrderOptions: TableOptions;

  constructor() {
    const supplierTypes: ColumnType[] = [
      { name: 'name', type: 'Text' },
      { name: 'phone', type: 'Number' },
    ];

    const options = [
      { name: 'Supply1' },
      { name: 'Supply2' },
    ];
    const map = (value: any) => value.name;
    const remap = (originalValue: any, mappedValue: any) => options.find(option => map(option) === mappedValue);

    const suppliesTypes: ColumnType[] = [
      { name: 'name', type: 'Text', options: { map, remap, options } },
      { name: 'quantity', type: 'Number' },
    ];

    const productOrderTypes: ColumnType[] = [
      { name: 'name', type: 'Text' },
      { name: 'date', type: 'Date' },
      { name: 'supplier', type: 'Object', options: { propertyTypes: supplierTypes } },
      { name: 'supplies', type: 'Table', options: { columnTypes: suppliesTypes } },
    ];

    this.productOrderOptions  = { columnTypes: productOrderTypes };
  }

  onModification(modification: any) {
    console.log(modification);
  }
}
