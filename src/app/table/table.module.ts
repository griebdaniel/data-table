import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { MatTableModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatDividerModule, MatSortModule, MatPaginatorModule }  from '@angular/material';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { DataTableComponent } from './data-table/data-table.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { EditableValueComponent } from './editable-value/editable-value.component';
import { FormsModule } from '@angular/forms';
import { FocusDirective } from './focus.directive';
import { TableHeaderComponent } from './table-header/table-header.component';

@NgModule({
  declarations: [TableComponent, SimpleTableComponent, DataTableComponent, EditableTableComponent, EditableValueComponent, FocusDirective, TableHeaderComponent],
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatCheckboxModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatSortModule,
    MatPaginatorModule
  ],
  exports: [TableComponent, SimpleTableComponent, DataTableComponent, EditableTableComponent]
})
export class TableModule { }
