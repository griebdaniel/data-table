import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TableModule } from './table/table.module'
import { FormsModule } from '@angular/forms';
// import { TableComponent } from './table/table/table.component';

import { DataTableModule } from 'data-table'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    DataTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
