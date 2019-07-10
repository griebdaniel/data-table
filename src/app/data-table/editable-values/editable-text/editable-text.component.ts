import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {
  @Input() value: string;
  @Output() onValueChange = new EventEmitter<string>();
  @Input() isOpen = false;

  @Output() onCancel = new EventEmitter<boolean>();

  valueControl = new FormControl();

  constructor() { }

  ngOnInit() {
    this.valueControl.setValue(this.value);
  }

  onCancelEvent() {
    this.onCancel.emit();
  }

  onSave() {

  }

}
