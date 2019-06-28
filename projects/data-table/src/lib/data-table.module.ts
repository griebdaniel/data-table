import { NgModule } from '@angular/core';
import { DataTableComponent } from './data-table/data-table.component';
import { EditableValueComponent } from './editable-value/editable-value.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatTableModule, MatCheckboxModule, MatInputModule,
  MatButtonModule, MatDividerModule, MatSortModule,
  MatPaginatorModule
} from '@angular/material';


@NgModule({
  declarations: [DataTableComponent, EditableValueComponent, TableHeaderComponent],
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatDividerModule, MatSortModule, MatPaginatorModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
