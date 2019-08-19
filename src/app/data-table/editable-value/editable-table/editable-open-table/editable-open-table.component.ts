import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableInfo } from '../../editable-type';
import { DataTableComponent } from 'src/app/data-table/data-table/data-table.component';

@Component({
  selector: 'app-editable-open-table',
  templateUrl: './editable-open-table.component.html',
  styleUrls: ['./editable-open-table.component.scss']
})
export class EditableOpenTableComponent implements OnInit {
  @ViewChild('table', { static: false }) table: DataTableComponent;

  constructor(public dialogRef: MatDialogRef<EditableOpenTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: object[], tableInfo: TableInfo }) { }

  ngOnInit() {
  }

  onSave() {
    console.log(this.table.data);
    this.dialogRef.close(this.table.data)
  }

  onCancel() {
    this.dialogRef.close();
  }
}
