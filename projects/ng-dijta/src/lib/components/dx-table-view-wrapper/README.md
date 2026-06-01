---
category: Components
type: Data Display
title: Table View Wrapper
---

Container that switches between a `dx-table` and a `dx-canvas` view over the same data set. Forwards table and canvas inputs through a single API and re-emits each view's events, so a parent only wires one component for both layouts.

## When To Use

- Offer users a choice between a standard table layout and a card/canvas layout of the same rows.
- Persist the currently selected view on the `multiViewTable` state object.
- Centralize data-loading, pagination, and selection handling across both views.

## API

```html
<dx-table-view-wrapper
  [multiViewTable]="{ selectedView: 'dx-table', isMultiViewToggle: true }"
  [columns]="columns"
  [dataSource]="rows"
  [setting]="setting"
  [canvasDataSource]="canvasRows"
  [canvasSetting]="canvasSetting"
  (onTableViewPaginationClick)="onPage($event)"
  (onTableViewCheckboxChange)="onSelect($event)">
</dx-table-view-wrapper>
```

### dx-table-view-wrapper

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[multiViewTable]` | View-switching state (active view + toggle flag) | `MultiViewTable` | - |
| `[columns]` | Column definitions for the table view | `DxTableColumn<T>[]` | `[]` |
| `[dataSource]` | Row data for the table view | `DxTableData<T>[]` | `[]` |
| `[templateRef]` | Custom row template for the table view | `TemplateRef<any>` | - |
| `[setting]` | Table-wide behavior settings | `DxTableSetting` | - |
| `[isBusy]` | Show loading state on both views | `boolean` | `false` |
| `[isAvatar]` | Enables avatar rendering in the table view | `boolean` | `false` |
| `[canvasDataSource]` | Row data for the canvas view | `DxCanvasData<T>[]` | - |
| `[canvasSetting]` | Canvas-view behavior settings | `DxCanvasSetting` | - |
| `[cardActions]` | Column definition used for per-card actions | `DxTableColumn<T>` | - |

### Events

Table-view outputs:

| Event | Description | Type |
|-------|-------------|------|
| `(onTableViewAction)` | Forwarded from `dx-table` `(onAction)` | `EventEmitter<OnAction<DxTableData<T>>>` |
| `(onTableViewSort)` | Forwarded from `dx-table` `(onSort)` | `EventEmitter<Sort>` |
| `(onTableViewCheckboxChange)` | Forwarded from `dx-table` `(onCheckboxChange)` | `EventEmitter<DxTableData<T>[]>` |
| `(onTableViewRowSelection)` | Forwarded from `dx-table` `(onRowSelection)` | `EventEmitter<DxTableData<T>[]>` |
| `(onTableViewFilterClick)` | Forwarded from `dx-table` `(onFilterClick)` | `EventEmitter<DxFilter>` |
| `(onTableViewPaginationClick)` | Forwarded from `dx-table` `(onPaginationClick)` | `EventEmitter<PageEvent>` |
| `(onTableViewEventChange)` | Forwarded from `dx-table` `(onEventChange)` | `EventEmitter<DxTableData<T>>` |
| `(onTablePageSizeChange)` | Forwarded from `dx-table` `(onClickTablePageSize)` | `EventEmitter<PageSize>` |

Canvas-view outputs:

| Event | Description | Type |
|-------|-------------|------|
| `(onCanvasViewCheckboxChange)` | Card selection changed | `EventEmitter<DxCanvasData<T>[]>` |
| `(onCanvasViewPaginationClick)` | Canvas pagination event | `EventEmitter<PageEvent>` |
| `(onClickCanvasViewHeaderAction)` | Canvas header action (filter, etc.) | `EventEmitter<DxFilter>` |
| `(onClickCanvasViewAction)` | Per-card action clicked | `EventEmitter<OnAction<T>>` |
| `(onCanvasPageSizeChange)` | Canvas page size changed | `EventEmitter<PageSize>` |

### Types

```typescript
type TABLE_VIEW_TYPES = 'dx-table' | 'dx-canvas';

interface MultiViewTable {
  selectedView: TABLE_VIEW_TYPES;
  isMultiViewToggle?: boolean;
}
```

## Examples

### Table view only

```html
<dx-table-view-wrapper
  [multiViewTable]="{ selectedView: 'dx-table' }"
  [columns]="columns"
  [dataSource]="rows">
</dx-table-view-wrapper>
```

### Table + canvas with toggle

```typescript
multiView: MultiViewTable = { selectedView: 'dx-table', isMultiViewToggle: true };
```

```html
<dx-table-view-wrapper
  [multiViewTable]="multiView"
  [columns]="columns"
  [dataSource]="rows"
  [canvasDataSource]="canvasRows"
  [canvasSetting]="canvasSetting"
  [cardActions]="cardActions">
</dx-table-view-wrapper>
```

### Reacting to canvas actions

```html
<dx-table-view-wrapper
  [multiViewTable]="multiView"
  [canvasDataSource]="canvasRows"
  [canvasSetting]="canvasSetting"
  (onClickCanvasViewAction)="handleCardAction($event)">
</dx-table-view-wrapper>
```

## Import

```typescript
import { DxTableViewWrapperModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTableViewWrapperModule]
})
export class YourModule { }
```
