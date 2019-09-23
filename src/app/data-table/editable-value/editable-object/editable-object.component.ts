import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnType, ObjectOptions } from '../editable-type';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';

import * as Lodash from 'lodash';
import { EditableOpenObjectComponent, ObjectModification } from './editable-open-object/editable-open-object.component';


@Component({
  selector: 'app-editable-object',
  templateUrl: './editable-object.component.html',
  styleUrls: ['./editable-object.component.scss']
})
export class EditableObjectComponent implements OnInit {
  @Input() options: ObjectOptions;
  @Input() value: object;
  @Output() save = new EventEmitter<object[]>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<ObjectModification>();

  objectModified = new Subject<any>();
  _open: boolean;
  dialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.objectModified.subscribe(modification => {
      this.modified.emit(modification);
    })
  }

  set open(open: boolean) {
    this._open = open;

    if (open === true) {
      this.dialogRef = this.dialog.open(EditableOpenObjectComponent, {
        width: '320px',
        data: { value: this.value, options: this.options, modified: this.objectModified, title: 'Edit' },
        autoFocus: false,
        disableClose: true
      });

      this.dialogRef.afterClosed().subscribe(result => {
        this._open = false;
        if (result !== undefined) {
          this.save.emit(Lodash.cloneDeep(result));
        } else {
          this.cancel.emit();
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
