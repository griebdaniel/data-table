import { Component } from '@angular/core';
import { TableOptions, ColumnType } from './data-table/editable-value/editable-type';

@Component({
  selector: 'gdr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userData = [{
    name: 'daniel',
    age: 25,
    date: new Date(),
    hobbies: ['chess', 'swimming', 'running'],
    activities: [
      { name: { name: 'sightseeing', price: 100 }, date: new Date(), location: { city: 'cluj', street: 'republicii' } },
    ]
  }];

  options = new TableOptions();

  constructor() {
    // this.options.hiddenColumns = ['age'];
    const activitiesOptions = new TableOptions();

    activitiesOptions.cancel = false;

    const hobbiesOptions = new TableOptions();
    hobbiesOptions.cancel = false;

    hobbiesOptions.columnTypes = [
      { name: 'name', type: 'Text', options: { options: ['a', 'b', 'c'] } }
    ];

    this.options.columnTypes = [
      { name: 'name', type: 'Text'},
      { name: 'age', type: 'Number' },
      { name: 'date', type: 'Date' },
      // { name: 'activities', type: 'Table', options: activitiesOptions },
      // { name: 'hobbies', type: 'Array', options: hobbiesOptions }
    ];
  }

  onModification(modification: any) {
    console.log(modification);
  }

}
