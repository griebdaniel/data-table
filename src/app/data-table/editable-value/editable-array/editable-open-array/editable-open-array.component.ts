import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableOptions } from '../../editable-type';
import { DataTableComponent } from 'src/app/data-table/data-table/data-table.component';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-editable-open-array',
  templateUrl: './editable-open-array.component.html',
  styleUrls: ['./editable-open-array.component.scss']
})
export class EditableOpenArrayComponent implements OnInit {

  @ViewChild('table', { static: false }) table: DataTableComponent;

  constructor(public dialogRef: MatDialogRef<EditableOpenArrayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: object[], options: TableOptions, modified: Subject<any> }) { }

  ngOnInit() {
    this.data.options = Object.assign({}, this.data.options, { save: true, close: true });
  }

  onSave(value: any) {
    this.dialogRef.close(value);
  }

  onModification(modification: any) {
    this.data.modified.next(modification);
  }
}
