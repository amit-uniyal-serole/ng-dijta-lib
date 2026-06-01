## Selector for config table

`<dx-config-table></dx-config-table>`

## Module

`DxConfigTableModule`

## Inputs

| Input                  | Data need to be passed as input                                               |
| ---------------------- | ----------------------------------------------------------------------------- |
| **configUrl** (string) | `configuration url to get table(setting,col,pageable,pageSizeList and dataUrl)` |

## Events

| Event                | Time of triggering                  | return type            |
| -------------------- | ----------------------------------- | ---------------------- |
| **onAction**         | `on click of action icons in table` | **OnAction<T>**        |
| **onCheckboxChange** | `on click of checkbox`              | **DxTableColumn<T>[]** |
| **onFilterClick**    | `on clicking Filter Icon`           | **DxFilter**           |

## Sample selector After implementing all inputs and output Events

> `<dx-config-table configUrl="http://localhost:3000/tableConfig" (onFilterClick)="onFilterClick($event)" (onAction)="onAction($event)" (onCheckboxChange)="onCheckboxChange($event)"></dx-config-table>`

## Material Icons link
>`<link
    href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
    rel="stylesheet" /> `