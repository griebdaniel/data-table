import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
  @Output() insert = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() filter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
