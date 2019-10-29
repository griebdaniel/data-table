import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableModule } from './data-table/data-table.module';
import { DataTableModule as DataTableModuleLib } from 'data-table';
import { LibTestComponent } from './lib-test/lib-test.component';

@NgModule({
  declarations: [
    AppComponent,
    LibTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataTableModule,
    // DataTableModuleLib
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
