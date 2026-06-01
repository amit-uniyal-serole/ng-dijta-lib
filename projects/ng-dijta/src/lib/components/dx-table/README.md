## Selector

`<dx-table></dx-table>`

## Module

`FlexTableModule`
`CUSTOM_ELEMENTS_SCHEMA need to add for table-content`

## Inputs

| Input                                  | Description                                                                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **columns** (Array<DxTableColumn<T>>)  | `Define table columns`                                                                                                                                                                            |
| **dataSource** (Array<DxTableData<T>>) | `Data which need to be displayed on table`                                                                                                                                                        |
| **setting** (DxTableSetting)           | `Define Table settings`                                                                                                                                                                           |
| **templateRef** (TemplateRef<any>)     | `Represents an embedded template that can be used to instantiate embedded views.Access a TemplateRef instance by placing a directive on an <ng-template> element (or directive prefixed with *).` |
|**SelectedRows**(SelectedRowsConfig<T>) |`default selection of single row with radio button`|
|**SelectedCheckboxes**(SelectedCheckboxConfig<T>)|`default selection of multiple rows with checkbox`|

## Events

| Event                       | Time of triggering                  | return type                        |
| --------------------------- | ----------------------------------- | ---------------------------------- |
| **onAction**                | `on click of action icons in table` | **OnAction<T>**                    |
| **onSort**                  | `on sorting columns`                | **Sort**                           |
| **onCheckboxChange**        | `on click of checkbox`              | **DxTableColumn<T>[]**             |
| **onFilterClick**           | `on clicking Filter Icon`           | **DxFilter**                       |
| **onPaginationClick**       | `on clicking paginator Icon`        | **PageEvent**                      |
| **onEventChange**           | `on Event Change`                   | **DxTableData<T>**                 |
| **onRowSelection**          | `on Row Selection`                  | **EventEmitter<DxTableData<T>[]>** |
| **onClickTablePageSize**    | `on clicking page size dropdown`    | **PageSize**                       |
| **onClickChangeViewAction** | `on clicking left side dropdown`    | **string**                         |

## Sample selector After implementing all inputs and output Events

> `<dx-table [columns]="columns" [dataSource]="dataSource" [setting]="setting" [templateRef]="templateRef" (onAction)="onAction($event)" (onSort)="onSort($event)" (onCheckboxChange)="onCheckboxChange($event)" (onFilterClick)="onFilterClick($event)" (onPaginationClick)="onPaginationClick($event)"></dx-table>`

## Import this fonts styles link in index.html to display material icons

> `<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">`
