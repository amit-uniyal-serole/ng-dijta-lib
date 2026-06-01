---
category: Components
type: Data Display
title: Config Table
---

A data-driven table that fetches its column, pagination, and filter configuration from a remote URL, then loads and renders rows against the resolved `dxTable`. Wraps `dx-table` and `dx-table-filter` to deliver a fully configured table from a single config endpoint.

## When To Use

- When table schemas (columns, pagination, filters, actions) come from a backend config service.
- When the same table component should serve many views driven only by configuration.
- When you need built-in pagination, sorting, filtering, and row/bulk actions without wiring each piece.
- For a hand-configured table, use `dx-table` directly instead.

## API

```html
<dx-config-table
  [configUrl]="'/api/tables/orders-config'"
  (onAction)="handleRowAction($event)"
  (onCheckboxChange)="handleSelection($event)">
</dx-config-table>
```

### dx-config-table

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[configUrl]` | URL returning a `DxTableConfig<T>` with table settings, columns, pageable, pageSizeList and filter settings | `string` | `-` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onAction)` | Emitted when the user triggers a row action | `EventEmitter<OnAction<DxTableData<T>>>` |
| `(onFilterClick)` | Emitted on paginator-bar actions other than `refresh` / `filter` | `EventEmitter<DxFilter>` |
| `(onCheckboxChange)` | Emitted when the selection of table rows changes | `EventEmitter<DxTableData<T>[]>` |

### Types

```typescript
interface DxTableConfig<T> {
  tableConfig: DxConfigTableSettings<T>;
}

interface DxConfigTableSettings<T> {
  col: DxTableColumn<T>[];
  data?: DxTableData<T>[];
  setting?: DxTableSetting;
  dataUrl?: string;
  pageable?: PaginationRequest;
  pageSizeList?: BulkActions;
  filterSettings?: DxTableFilterSettings[];
}

interface PaginationRequest {
  pageNo?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

type FilterResult = { [x: string]: string | any };
```

## Examples

### Basic configured table

```html
<dx-config-table
  [configUrl]="'/api/tables/users'"
  (onAction)="onRowAction($event)">
</dx-config-table>
```

### With selection and custom filter hook

```typescript
onRowAction(event: OnAction<DxTableData<UserRow>>): void {
  switch (event.type) {
    case 'edit':   this.edit(event.data);   break;
    case 'delete': this.delete(event.data); break;
  }
}

onSelectionChange(rows: DxTableData<UserRow>[]): void {
  this.selected = rows;
}
```

```html
<dx-config-table
  [configUrl]="configUrl"
  (onAction)="onRowAction($event)"
  (onCheckboxChange)="onSelectionChange($event)"
  (onFilterClick)="onCustomFilter($event)">
</dx-config-table>
```

## Import

```typescript
import { DxConfigTableModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxConfigTableModule]
})
export class YourModule { }
```
