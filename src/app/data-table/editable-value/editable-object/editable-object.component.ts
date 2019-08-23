import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import EditableValue from '../editable-value';
import { ColumnInfo } from '../editable-type';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';

import * as Lodash from 'lodash';
import { EditableOpenObjectComponent } from './editable-open-object/editable-open-object.component';

@Component({
  selector: 'app-editable-object',
  templateUrl: './editable-object.component.html',
  styleUrls: ['./editable-object.component.scss']
})
export class EditableObjectComponent implements OnInit {
  @Input() typeInfo: ColumnInfo;
  @Input() value: object;
  @Output() save = new EventEmitter<object[]>();
  @Output() cancel = new EventEmitter<void>();

  _open: boolean;
  dialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {

  }

  set open(open: boolean) {
    this._open = open;

    if (open === true) {
      this.dialogRef = this.dialog.open(EditableOpenObjectComponent, {
        width: '320px',
        data: { value: this.value, typeInfo: this.typeInfo, title: 'Edit' },
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

  get showedValue() {
    let value = '';
    for (const key in this.value) {
      if (this.value.hasOwnProperty(key)) {
        const element = this.value[key];
        value += ' ' + element;
      }
    }

    return value.substr(0, 12) + ' ...';
  }
}
