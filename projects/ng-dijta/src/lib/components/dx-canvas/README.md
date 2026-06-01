## Selector

`<dx-canvas></dx-canvas>`

## Module

`import{DxCanvasModule} from @ngdx/dijta`

## Inputs

| Input                                         | Description                                       |
| --------------------------------------------- | ------------------------------------------------- |
| **canvasDataSource** (Array<DxCanvasData<T>>) | `Data which need to be displayed on canvas cards` |
| **canvasSetting** (DxCanvasSetting)           | `Define canvas settings`                          |
| **cardActions** (DxTableColumn<T>)            | `Define card actions`                             |

## Events

| Event                         | Time of triggering                  | return type           |
| ----------------------------- | ----------------------------------- | --------------------- |
| **onClickCanvasAction**       | `on click of action icons in table` | **OnAction<T>**       |
| **onCanvasCheckboxChange**    | `on click of checkbox`              | **DxCanvasData<T>[]** |
| **onCanvasPaginationClick**   | `on clicking paginator Icon`        | **PageEvent**         |
| **onClickCanvasHeaderAction** | `on clicking Filter Icon`           | **DxFilter**          |
| **onClickCanvasPageSize**     | `on clicking page size dropdown`    | **PageSize**          |

## Sample selector After implementing all inputs and output Events

> `<dx-canvas [multiViewTable]="multiViewTable" [canvasSetting]="canvasSetting" [canvasDataSource]="canvasDataSource" [cardActions]="cardActions" (onCanvasPaginationClick)="onCanvasPaginationClick($event)" (onCanvasCheckboxChange)="onCanvasCheckboxChange($event)" (onClickCanvasHeaderAction)="onClickCanvasHeaderAction($event)" (onClickCanvasAction)="onClickCanvasAction($event)" ></dx-canvas>`

## Import this fonts styles link in index.html to display material icons

> `<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">`
