import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
// import { TableComponent } from './table/table/table.component';

import { DataTableModule } from './data-table/data-table.module'
import { TableInsertComponent } from './data-table/table-insert/table-insert.component';

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
  entryComponents: [TableInsertComponent]
})
export class AppModule { }
