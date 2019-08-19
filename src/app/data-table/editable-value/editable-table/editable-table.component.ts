import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import EditableValue from '../editable-value';
import { TableInfo, TableModification } from '../editable-type';
import { Observable } from 'rxjs';
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
  @Input() saveConfirmation: Observable<boolean>;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<TableModification>();

  _open: boolean;

  dialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.value);
    this.typeInfo.features = Object.assign({}, this.typeInfo.features, { close: true, save: true });
  }

  set open(open: boolean) {
    this._open = open;

    if (open === true) {
      this.dialogRef = this.dialog.open(EditableOpenTableComponent, {
        panelClass: 'custom-dialog-container',
        width: '720px',
        data: { data: this.value, tableInfo: this.typeInfo },
        autoFocus: false,
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
