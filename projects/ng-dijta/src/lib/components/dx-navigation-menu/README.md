## `DxLayoutModule`

> `import { DxNavigationMenuModule } from '@ngdx/dijta';`

## Selector

`<dx-navigation-menu></dx-navigation-menu>`

## Inputs

| Input  | Data need to be passed as input |
| ------------- | ------------- |
| **menu** (DxNavigationMenu<T>[]) | `Menu Data source`  |
| **config** (NavigationConfig) | `Navigation Menu Config`|

## Events

| Event  | Time of triggering |   return type |
| ------------- | ------------- |--------|
| **onClickMenu**  | `on click menu child`  | **NavigationMenuChildren** |

## Usage
`<dx-navigation-menu [menu]="menuList" [config]="config" (onClickMenu)="onClickMenu($event)"></dx-navigation-menu>`
