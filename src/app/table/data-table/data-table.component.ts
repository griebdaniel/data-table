import { Component, OnInit, Input } from '@angular/core';
import { TableInfo } from '../table-info';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() data: object[];
  @Input() tableInfo: TableInfo;

  constructor() { 

  }

  ngOnInit() {

  }

}
