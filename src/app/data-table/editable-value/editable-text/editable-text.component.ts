import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextOptions } from '../editable-type';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {
  @Input() options: TextOptions;

  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<string>();

  open = false;
  valueControl = new FormControl();
  _value: any;

  filteredOptions: Observable<string[]>;

  constructor() {

  }

  ngOnInit() {
    if (!this.options) {
      this.options = {};
    }

    if (!this.options.map) {
      this.options.map = (value) => value;
      this.options.remap = (originalValue, mappedValue) => mappedValue;
    }

    if (!this.options.options) {
      this.options.options = [];
    }

    this.filteredOptions = this.valueControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );

    
    this.valueControl.setValue(this.options.map(this._value));

  }

  @Input() set value(value: any) {
    if (!value) {
      this._value = value = '';
    } else {
      this._value = value;
    }

    if (this.options && this.options.map) {
      value = this.options.map(value);
    }

    this.valueControl.setValue(value);
  };

  get value() {
    return this.valueControl.value;
  }

  onSave() {
    let value = this.valueControl.value;
    this._value = this.options.remap(this._value, value);
    this.save.emit(this._value);
  }

  private filter(value: string): string[] {
    const options = this.options.options.map((option) => this.options.map(option))
    const filterValue = value.toLowerCase();
    return options.filter((option: string) => option.toLowerCase().includes(filterValue));
  }
}
