import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent implements OnInit {
  dataSource = [
    { name: 'supply1', quantity: 10 },
    { name: 'supply2', quantity: 20 }
  ];

  displayedColumns = ['name', 'quantity'];

  constructor() { }

  ngOnInit() {
  }

}
