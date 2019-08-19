import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
// import { TableComponent } from './table/table/table.component';

import { DataTableModule } from './data-table/data-table.module'
import { TableInsertComponent } from './data-table/table-insert/table-insert.component';
import { EditableOpenTableComponent } from './data-table/editable-value/editable-table/editable-open-table/editable-open-table.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TableInsertComponent, EditableOpenTableComponent]
})
export class AppModule { }
