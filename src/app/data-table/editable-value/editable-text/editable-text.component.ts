import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextInfo } from '../editable-type';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {
  @Input() typeInfo: TextInfo;

  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  open = false;
  valueControl = new FormControl();
  _value: any;

  filteredOptions: Observable<string[]>;

  constructor() {

  }

  ngOnInit() {
    if (!this.typeInfo) {
      this.typeInfo = {};
    }

    if (!this.typeInfo.map) {
      this.typeInfo.map = (value) => value;
      this.typeInfo.remap = (originalValue, mappedValue) => mappedValue;
    }

    if (!this.typeInfo.options) {
      this.typeInfo.options = [];
    }

    this.filteredOptions = this.valueControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );

    
    this.valueControl.setValue(this.typeInfo.map(this._value));

  }

  @Input() set value(value: any) {
    if (!value) {
      this._value = value = '';
    } else {
      this._value = value;
    }

    if (this.typeInfo && this.typeInfo.map) {
      value = this.typeInfo.map(value);
    }

    this.valueControl.setValue(value);
  };

  get value() {
    return this.valueControl.value;
  }

  onSave() {
    let value = this.valueControl.value;
    this._value = this.typeInfo.remap(this._value, value);
    this.save.emit(this._value);
  }

  private filter(value: string): string[] {
    const options = this.typeInfo.options.map((option) => this.typeInfo.map(option))
    const filterValue = value.toLowerCase();
    return options.filter((option: string) => option.toLowerCase().includes(filterValue));
  }
}
