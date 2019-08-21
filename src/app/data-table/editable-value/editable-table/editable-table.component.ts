import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import EditableValue from '../editable-value';
import { TableInfo } from '../editable-type';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditableOpenTableComponent } from './editable-open-table/editable-open-table.component';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent implements OnInit, EditableValue {
  @Input() typeInfo: TableInfo;
  @Input() value: object[];

  @Output() save = new EventEmitter<object[]>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<any>();

  _open: boolean;
  tableModified = new Subject<any>();
  dialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.tableModified.subscribe((modification) => {
      this.modified.emit(modification);
    });
  }

  set open(open: boolean) {
    this._open = open;

    if (open === true) {
      this.dialogRef = this.dialog.open(EditableOpenTableComponent, {
        panelClass: 'custom-dialog-container',
        width: '100vw',
        data: { data: this.value, tableInfo: this.typeInfo, modified: this.tableModified },
        autoFocus: false,
        disableClose: true
      });

      this.dialogRef.afterClosed().subscribe(result => {
        this._open = false;
        if (result !== undefined) {
          this.save.emit(Lodash.cloneDeep(result));
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

  get open() {
    return this._open;
  }
}
