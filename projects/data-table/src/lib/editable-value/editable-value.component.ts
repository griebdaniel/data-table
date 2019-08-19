import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { EditableType, AutocompleteMapInfo } from './editable-type';
import { DataTableComponent } from '../data-table/data-table.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import * as Lodash from 'lodash';;

@Component({
  selector: 'lib-editable-value',
  templateUrl: './editable-value.component.html',
  styleUrls: ['./editable-value.component.scss']
})
export class EditableValueComponent implements OnInit {
  private _open = false;

  @Input() value: any;
  @Input() type: EditableType;
  @Output() valueChanged = new EventEmitter();

  valueControl = new FormControl();
  filteredOptions: Observable<string[]>;
  
  constructor() { }

  ngOnInit() {
    if (this.type.name === 'Table' && this.value === undefined) {
      this.value = [];
    }

    if (this.type.name === 'AutocompleteMap') {
      this.valueControl.setValue(this.type.info['map'](this.value));
    } else {
      this.valueControl.setValue(this.value);
    }
    
    this.filteredOptions = this.valueControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const options = Lodash.map(this.type.info['options'], (option: string) => this.type.info['map'](option));
    const filterValue = value.toLowerCase();
    return options.filter((option: string) => option.toLowerCase().includes(filterValue));
  }

  get open() {
    return this._open;
  }

  set open(open: boolean) {
    console.log(open);
    if (this._open === true && open === false && this.type.name !== 'Table') {
      this.valueChanged.emit(this.value);
    }
    this._open = open;
  }

  onTableClick(event: Event, table: DataTableComponent) {
    table.editableValues.forEach(editableValue => {
      editableValue.open = false;
    });
    event.stopPropagation();
  }

  onOpenClick(event: Event) {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event']) clickout(event: Event) {
    this.open = false;
  }
}