import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output, EventEmitter, ElementRef, AfterViewInit, ComponentRef } from '@angular/core';
import { EditableValueComponent } from '../editable-value/editable-value.component';
import { TableOptions, EditableType, ObjectOptions } from '../editable-value/editable-type';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as Lodash from 'lodash';
import { EditableOpenObjectComponent } from '../editable-value/editable-object/editable-open-object/editable-open-object.component';
import { empty } from 'rxjs';


export class TableInsert {
  constructor(public rows: object) { }
}

export class TableDelete {
  constructor(public rows: object[]) { }
}

export class TableUpdate {
  constructor(public row: object, public column: string, public value: any) { }
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

  @Input() options: TableOptions;
  @Output() modified = new EventEmitter<TableUpdate | TableInsert | TableDelete>();
  @Output() save = new EventEmitter<object[]>();
  @Output() cancel = new EventEmitter<object[]>();

  defaultOptions: TableOptions;
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog) {
    this.defaultOptions = {
      filter: true,
      pagination: true,
      editDisabled: false,
      select: true,
      insert: true,
      delete: true,
      close: false,
      save: false,
    };
  }

  @Input() set data(data: object[] | Promise<object[]>) {
    data = Promise.resolve(data);
    data.then(data2 => {
      this.dataSource.data = data2 === undefined ? [] : data2;

      this.initializeTypes();

    });
  }

  initializeTypes() {
    const getType = (value: any): EditableType => {
      let type: EditableType;

      console.log(value);

      if (typeof value === 'number') {
        type = 'Number';
      } else if (typeof value === 'string') {
        type = 'Text';
      } else if (value instanceof Date) {
        type = 'Date';
      } else if (Lodash.isArray(value)) {
        type = 'Table';
      } else if (value instanceof Object) {
        type = 'Object';
      }

      return type;
    }

    this.dataSource.data.forEach(row => {
      Lodash.forOwn(row, (value: any, key: string) => {
        if (this.options.columnTypes.find(column => column.name === key) === undefined) {
          const type = getType(value);
          this.options.columnTypes.push({ name: key, type: type });
        }
      });
    });

    this.options.columnTypes.forEach(columnType => {
      if (columnType.type === 'Object') {
        if (!columnType.options) {
          columnType.options = {};
        }
        if (!(columnType.options as ObjectOptions).propertyTypes) {
          (columnType.options as ObjectOptions).propertyTypes = [];
        }

        this.dataSource.data.forEach(element => {
          Lodash.forOwn(element[columnType.name], (value: any, key: string) => {
            if ((columnType.options as ObjectOptions).propertyTypes.find(property => property.name === key) === undefined) {
              const type = getType(value);
              (columnType.options as ObjectOptions).propertyTypes.push({ name: key, type: type });
            }
          });
        });
      }
    });
  }

  get data() {
    return this.dataSource.data;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource.paginator = this.paginator, 0);
    this.options = Object.assign({}, this.defaultOptions, this.options);
    if (this.options.columnTypes === undefined) {
      this.options.columnTypes = [];
    }
  }

  onSave() {
    this.save.emit(this.data as object[]);
  }

  onCellClick(editableValue: EditableValueComponent, column: string) {
    if (
      this.openedEditableValue === undefined &&
      this.options.editDisabled !== true &&
      (this.options.editDisabled === false || (this.options.editDisabled as any).indexOf(column) > -1)
    ) {
      editableValue.open = true;
    }
  }

  onUpdate(row: object, column: string, value: any) {
    const update = new TableUpdate(Lodash.clone(row), column, value);
    row[column] = value;
    this.modified.emit(update);
  }

  onInsert() {
    const dialogRef = this.dialog.open(EditableOpenObjectComponent, {
      width: '320px',
      data: { value: {}, options: { propertyTypes: this.options.columnTypes } , title: 'Insert' },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dataSource.data.unshift(result);
        this.modified.emit(new TableInsert(result));
      }
      this.dataSource.data = this.dataSource.data;
    });
  }

  onDelete() {
    this.selection.selected.forEach((selected: object) => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(selected), 1);
    });

    this.modified.emit(new TableDelete(this.selection.selected));

    this.selection.clear();
    this.dataSource.data = this.dataSource.data;
  }

  onModification(row: object, column: string, modification: any) {
    this.modified.emit(new TableUpdate(row, column, modification));
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
    const columns = this.options.columnTypes.map(columnInfo => columnInfo.name);
    if (this.options.select) {
      columns.unshift('select');
    }
    return columns;
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

