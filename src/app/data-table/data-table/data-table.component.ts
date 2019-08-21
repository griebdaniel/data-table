import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output, EventEmitter, ElementRef, AfterViewInit, ComponentRef } from '@angular/core';
import { EditableValueComponent } from '../editable-value/editable-value.component';
import { TableInfo } from '../editable-value/editable-type';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as Lodash from 'lodash';
import { TableInsertComponent } from '../table-insert/table-insert.component';
import { EditableOpenObjectComponent } from '../editable-value/editable-object/editable-open-object/editable-open-object.component';

export class TableModification {
  constructor(public value: any, public modification: TableInsert | TableDelete | TableUpdate) { }
}

export class TableInsert {
  constructor(public rows: object | object[]) { }
}

export class TableDelete {
  constructor(public rows: object | object[]) { }
}

export class TableUpdate {
  constructor(public row: object, public column: string, public value: any) { }
}

export class TableFeatures {
  sort?: boolean;
  filter?: boolean;
  edit?: boolean;
  select?: boolean;
  insert?: boolean;
  delete?: boolean;
  close?: boolean;
  save?: boolean;
  header?: boolean;
  pagination?: boolean;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChildren('editableValue') editableValues: QueryList<any>;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() tableInfo: TableInfo;
  @Output() modified = new EventEmitter<TableModification>();

  defaultFeatures: TableFeatures;
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog) {
    this.defaultFeatures = {
      sort: true,
      filter: true,
      pagination: true,
      edit: true,
      select: true,
      insert: true,
      delete: true,
      close: false,
      save: false,
      header: true,
    };
  }

  @Input() set data(data: object[] | Promise<object[]>) {
    data = Promise.resolve(data);
    data.then(data2 => this.dataSource.data = data2 === undefined ? [] : Lodash.cloneDeep(data2));
  }

  get data() {
    return this.dataSource.data;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource.paginator = this.paginator, 0);
    this.tableInfo.features = Object.assign({}, this.defaultFeatures, this.tableInfo.features);
  }

  onCellClick(editableValue: EditableValueComponent) {
    if (this.openedEditableValue === undefined) {
      editableValue.open = true;
    }
  }

  onUpdate(row: object, column: string, value: any) {
    const update = new TableUpdate(Lodash.clone(row), column, value);
    row[column] = value;
    this.modified.emit(new TableModification(Lodash.cloneDeep(this.data), update));
  }

  onInsert() {
    const dialogRef = this.dialog.open(EditableOpenObjectComponent, {
      width: '320px',
      data: { value: {}, typeInfo: this.tableInfo, title: 'Insert' },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dataSource.data.unshift(result);
        this.modified.emit(new TableModification(Lodash.cloneDeep(this.data), new TableInsert(result)));
      }
      this.dataSource.data = this.dataSource.data;
    });
  }

  onDelete() {
    this.selection.selected.forEach((selected: object) => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(selected), 1);
    });

    this.modified.emit(new TableModification(Lodash.cloneDeep(this.data), new TableDelete(this.selection.selected)));

    this.selection.clear();
    this.dataSource.data = this.dataSource.data;
  }

  onModification(row: object, column: string, modification: TableModification) {
    row[column] = modification.value;
    this.modified.emit(new TableModification(Lodash.cloneDeep(this.data), new TableUpdate(row, column, modification)));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  get columnsWithSelect() {
    const data = Lodash.clone(this.tableInfo.displayedColumns);
    if (this.tableInfo.features.select) {
      data.unshift('select');
    }
    return data;
  }

  get openedEditableValue(): any {
    let editableValue2: any;

    this.editableValues.forEach(editableValue => {
      if (editableValue.open === true) {
        editableValue2 = editableValue;
      }
    });

    return editableValue2;
  }

}

