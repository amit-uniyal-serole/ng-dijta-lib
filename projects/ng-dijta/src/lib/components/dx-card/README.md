## Selector for dx-card

`<dx-card-wrapper></dx-card-wrapper>`

## Module

`DxCardModule`

## Inputs

| Input                     | Data need to be passed as input               |
| ------------------------- | --------------------------------------------- |
| **config** (DxCardConfig) | `pass data config to display content on card` |

## Events

| Event                 | Time of triggering                          | return type |
| --------------------- | ------------------------------------------- | ----------- |
| **onClickCardAction** | `on click of action buttons and menu items` | **string**  |

## selector

`<dx-card-wrapper (onClickCardAction)="onClickCardAction($event)" [config]="dxCardConfig"></dx-card-wrapper>`