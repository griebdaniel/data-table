import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


class HeaderOptions {
  insert?: boolean;
  delete?: boolean;
  filter?: boolean;
  close?: boolean;
  save?: boolean;
}

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Input() options: HeaderOptions;
  @Output() insert = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();

  defaultOptions: HeaderOptions = {
    insert: true,
    delete: true,
    filter: true,
    close: false,
    save: false,
  }

  constructor() { }

  ngOnInit() {
    this.options = Object.assign({}, this.defaultOptions, this.options);
  }
}
