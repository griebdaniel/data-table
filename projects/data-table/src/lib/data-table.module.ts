import { NgModule } from '@angular/core';
import { DataTableComponent } from './data-table/data-table.component';
import { EditableValueComponent } from './editable-value/editable-value.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule, MatCheckboxModule, MatInputModule,
  MatButtonModule, MatDividerModule, MatSortModule,
  MatPaginatorModule,
  MatAutocompleteModule
} from '@angular/material';
import { FocusDirective } from './focus/focus.directive';


@NgModule({
  declarations: [DataTableComponent, EditableValueComponent, TableHeaderComponent, FocusDirective],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatTableModule, MatCheckboxModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatSortModule, 
    MatPaginatorModule, MatAutocompleteModule,
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
