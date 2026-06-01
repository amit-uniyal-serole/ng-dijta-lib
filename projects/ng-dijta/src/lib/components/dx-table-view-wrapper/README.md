## Selector

`<dx-table-view-wrapper></dx-table-view-wrapper>`

## Module

`import{DxTableViewWrapperModule} from @ngdx/dijta`

## Inputs

### Table

| Input                                  | Description                                |
| -------------------------------------- | ------------------------------------------ |
| **columns** (Array<DxTableColumn<T>>)  | `Define table columns`                     |
| **dataSource** (Array<DxTableData<T>>) | `Data which need to be displayed on table` |
| **setting** (DxTableSetting)           | `Define Table settings`                    |

### Canvas

| Input                                         | Description                                       |
| --------------------------------------------- | ------------------------------------------------- |
| **canvasDataSource** (Array<DxCanvasData<T>>) | `Data which need to be displayed on canvas cards` |
| **canvasSetting** (DxCanvasSetting)           | `Define canvas settings`                          |
| **cardActions** (DxTableColumn<T>)            | `Define card actions`                             |

## Events

### Table

| Event                          | Time of triggering                  | return type                        |
| ------------------------------ | ----------------------------------- | ---------------------------------- |
| **onTableViewAction**          | `on click of action icons in table` | **OnAction<T>**                    |
| **onTableViewSort**            | `on sorting columns`                | **Sort**                           |
| **onTableViewCheckboxChange**  | `on click of checkbox`              | **DxTableColumn<T>[]**             |
| **onTableViewFilterClick**     | `on clicking Filter Icon`           | **DxFilter**                       |
| **onTableViewPaginationClick** | `on clicking paginator Icon`        | **PageEvent**                      |
| **onTableViewEventChange**     | `on Event Change`                   | **DxTableData<T>**                 |
| **onTableViewRowSelection**    | `on Row Selection`                  | **EventEmitter<DxTableData<T>[]>** |
| **onTablePageSizeChange**      | `on clicking page size dropdown`    | **PageSize**                       |

### Canvas

| Event                             | Time of triggering                  | return type           |
| --------------------------------- | ----------------------------------- | --------------------- |
| **onClickCanvasViewAction**       | `on click of action icons in table` | **OnAction<T>**       |
| **onCanvasViewCheckboxChange**    | `on click of checkbox`              | **DxCanvasData<T>[]** |
| **onCanvasViewPaginationClick**   | `on clicking paginator Icon`        | **PageEvent**         |
| **onClickCanvasViewHeaderAction** | `on clicking Filter Icon`           | **DxFilter**          |
| **onCanvasPageSizeChange**        | `on clicking page size dropdown`    | **PageSize**          |

## Sample selector After implementing all inputs and output Events

> `<dx-table-view-wrapper [multiViewTable]="multiViewTable" [canvasSetting]="canvasSetting" [canvasDataSource]="canvasDataSource" [cardActions]="cardActions" (onCanvasViewPaginationClick)="onCanvasViewPaginationClick($event)" (onCanvasViewCheckboxChange)="onCanvasViewCheckboxChange($event)" (onClickCanvasViewHeaderAction)="onClickCanvasViewHeaderAction($event)" (onClickCanvasViewAction)="onClickCanvasViewAction($event)" (onCanvasPageSizeChange)="onCanvasPageSizeChange($event)" [dataSource]="dataSource" [setting]="setting" [columns]="tableColumns" (onTableViewCheckboxChange)="onTableViewCheckboxChange($event)" (onTableViewRowSelection)="onTableViewRowSelection($event)" (onTableViewSort)="onTableViewSort($event)" (onTableViewFilterClick)="onTableViewFilterClick($event)" (onTableViewAction)="onTableViewAction($event)" (onTableViewEventChange)="onTableViewEventChange($event)" (onTableViewPaginationClick)="onTableViewPaginationClick($event)" (onTablePageSizeChange)="onTablePageSizeChange($event)"> </dx-table-view-wrapper>`

## Import this fonts styles link in index.html to display material icons

> `<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">`
