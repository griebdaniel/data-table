import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { EditableType, EditableTypeInfo, EditableTypeName } from './editable-type';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import EditableValue from './editable-value';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-editable-value',
  templateUrl: './editable-value.component.html',
  styleUrls: ['./editable-value.component.scss']
})
export class EditableValueComponent implements OnInit, EditableValue {
  @Input() typeInfo: EditableTypeInfo;
  @Input() typeName: EditableTypeName;
  @Input() saveConfirmation: Observable<boolean>;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<any>();

  _value: string | number | Date | object | object[]

  @ViewChild('editableValue', { static: false }) editableValue: any;

  ngOnInit() {

  }

  onSave(value: any) {
    this.save.emit(value);
  }

  onCancel() {
    this.cancel.emit();
    this.editableValue.value = this.value;
  }

  onModification(modification: any) {
    this.modified.emit(modification);
  }

  get open() {
    if (this.editableValue === undefined) {
      return false;
    }
    return this.editableValue.open;
  }

  set open(open: boolean) {
    this.editableValue.open = open;
  }

  @Input() set value(value: string | number | Date | object | object[]) {
    this._value = value;
    if (this.editableValue !== undefined) {
      this.editableValue.value = value;
    }
  };

  get value() {
    return this._value;
  }
}
