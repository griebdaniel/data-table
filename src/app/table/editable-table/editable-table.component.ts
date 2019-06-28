import { Component, OnInit, Input } from '@angular/core';
import { TableInfo } from '../table-info';
import { EditableValueComponent } from '../editable-value/editable-value.component';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {
  @Input() data: object[];
  @Input() tableInfo: TableInfo;
  
  constructor() { }

  ngOnInit() {

  }

  onCellClick(value: EditableValueComponent) {
    value.open = true;
  }

}
