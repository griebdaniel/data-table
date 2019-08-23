import { Component, OnInit, Inject, Input, ViewChildren, QueryList } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColumnInfo } from '../../editable-type';
import EditableValue from '../../editable-value';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-editable-open-object',
  templateUrl: './editable-open-object.component.html',
  styleUrls: ['./editable-open-object.component.scss']
})
export class EditableOpenObjectComponent implements OnInit {
  value = {};

  @ViewChildren('editableValue') editableValues: QueryList<any>;

  constructor(
    public dialogRef: MatDialogRef<EditableOpenObjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: object, typeInfo: ColumnInfo, title: string }
  ) {

  }

  ngOnInit(): void {
    if (this.data.value === undefined) {
      this.value = {};
    } else {
      this.value = Lodash.cloneDeep(this.data.value);
    }
  }

  get openedEditableValue() {
    let editableValue2: any;

    this.editableValues.forEach(editableValue => {
      if (editableValue.open === true) {
        editableValue2 = editableValue;
      }
    });

    return editableValue2;
  }

  openEditableValue(editableValue: EditableValue) {
    if (!this.openedEditableValue) {
      editableValue.open = true;
    }
  }
}
