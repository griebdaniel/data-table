
# Data Table

This library contains an editable data table using material design. This table was built on the table component from the **@angular/material** library.
You can test the library [**here**](https://stackblitz.com/github/griebdr/data-table-lib-test).

## Setup

If your project doesn't have `@angular/material` installed, run:

	ng add @angular/material

Add this to your `styles.css` file (to disable padding in nested table):

	.table-dialog-container .mat-dialog-container {
		padding: 0px;
		margin: 0px;
	}

Make sure your index.html contains the following lines:
	
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  
## How to use:
In your module you want to use the data table:

    import { DataTableModule } from 'gdr-data-table';

    @NgModule({
	    imports: [ ..., DataTableModule ]
    })
	
In your component template file:

	<gdr-data-table [data]="data" [options]="options" 
	(modified)="onModification($envet)"> </gdr-data-table>

Where `data` is an array of object and the properties of the objects are the columns.
The `options` is of type `TableOptions` and can be used to change the behavior of the table (see the available options below).
The `modified` event will be fired whenever a modification to the data has been made.

## Editing data

Whenever a value is edited the table will emit an event of type **TableInsert**, **TableDelete** or **TableUpdate** depending on the modification type.

Example:

In your template:

	<gdr-data-table [data]="data" (modified)="onModification($event)"><gdr-data-table>

In your component:

	onModification(modification: any) {
		if (modification instanceof TableInsert) {
			// a row was inserted into the table, you can handle it here
		}
		// same with TableUpdate and TableInsert
	}
	
## Table options

The following options are available:

-  **columnTypes**:

With this options you can specify the column types manually. The supported types are: **Text**, **Number**, **Date**, **Boolean**, **Object**, **Array**, **Table**

Example:

	tableOptions = new TableOptions();
	...
	tableOptions.columnTypes = [
		{ name: 'userName', type: 'Text' },
		{ name: 'age', type: 'Number' },
	];

-  **hiddenColumns**:

An array containing the columns you don't want to display.

-  **editDisabled**

If set to true editing cells are disabled. You can also specify an array of column, in that case the columns specified in the array are not editable.

-  **filter**

Whether filtering rows should be enabled.

-  **select**

Enable or disable row selection.

-  **insert**

Enable or disable inserting rows from the table.

-  **delete**

Enable or disable deleting rows from the table.

-  **pagination**

Enable or disable pagination.

-  **save**

If set true adds save button to the data-table. You can listen to this event with the **save** directive.

-  **cancel**

If set true adds cancel button to the data-table. You can listen to this event with the **cancel** directive.

For example, in your component:

	import { TableOptions } from 'gdr-data-table'
	...
		tableOptions = new TableOptions();
	...
		tableOptions.filter = false; // disables filtering
		tableOptions.editDisable = ['columnName']; // disable editing for the column 'columnName'
	...

And in you template:

	<gdr-data-table [data]="data" [options]="tableOptions">