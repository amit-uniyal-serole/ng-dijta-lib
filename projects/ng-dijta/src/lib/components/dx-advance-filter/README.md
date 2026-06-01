## Module

> `import {DxAdvanceFilterModule} from '@ngdx/dijta'`

## Styles

- bootstrap css in angular.json

  - styles:["./node_modules/bootstrap/dist/css/bootstrap.min.css"]

- Material Icons

  - `<link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round&display=block" rel="stylesheet" />`

- Material Theme (indigo-pink/pink-bluegrey/purple-green)
  - @import "@angular/material/prebuilt-themes/deeppurple-amber.css";

## Inputs

| Input                             | Data need to be passed as input                      |
| --------------------------------- | ---------------------------------------------------- |
| **filterButtons** (FilterButtons) | `ConfigureButtons to get FilterForm data and cancel` |
| **filterData** (FilterData)       | `FilterData to show data in filter fields`           |
| **title** (string)                | `Title`                                              |

## Events

| Event             | Time of triggering       | return type           |
| ----------------- | ------------------------ | --------------------- |
| **onClickAction** | `on click cancel/search` | **string/form value** |

## Selector

> `<dx-advance-filter [filterButtons]="filterButtons" (onClickAction)="onClickAction($event)" [filterData]="filterData"></dx-advance-filter> `

## Sample Data

```
filterData: FilterData = {
    columns: [
      {
        keyTt: 'salary',
        valueTt: 'salary',
        conditions: [{
          keyTt: 'between',
          valueTt: 'between'
        }]
      },
      {
        keyTt: 'Carrier',
        valueTt: 'Carrier',
        conditions: [{
          keyTt: 'Contains',
          valueTt: 'Contains'
        }]
      }
    ]
  }
```
