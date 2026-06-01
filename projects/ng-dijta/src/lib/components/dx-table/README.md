---
category: Components
type: Data Display
title: Table
---

Feature-rich data table built on Angular Material `mat-table` with generic row typing, column-level cell renderers, sorting, pagination, row selection, drag-reorder, bulk actions, multi-view switching, and an inline edit mode.

## When To Use

- Render tabular data with mixed cell types (text, currency, date, avatar, chips, actions, links, dropdowns).
- Provide single- or multi-row selection, paginated data sets, or drag-to-reorder.
- Expose row-level and bulk actions with context menus and confirmation popovers.
- Switch between table and canvas views via the `multiViewTable` wrapper.
- Show a skeleton loading state while data is fetched (`isBusy` / `isHeaderBusy`).

## API

```html
<dx-table
  [columns]="columns"
  [dataSource]="rows"
  [setting]="setting"
  [isBusy]="loading"
  (onAction)="handleAction($event)"
  (onSort)="handleSort($event)"
  (onPaginationClick)="handlePage($event)"
  (onCheckboxChange)="handleSelection($event)">
</dx-table>
```

### dx-table

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[columns]` | Column definitions (generic `T`) | `DxTableColumn<T>[]` | `[]` |
| `[dataSource]` | Row data wrapped via `DxTableData<T>` | `DxTableData<T>[]` | `[]` |
| `[type]` | Table visual style | `'classic' \| 'default' \| 'canvas'` | `'default'` |
| `[setting]` | Table-wide behavior settings (selection, drag, default sort, row click, etc.) | `DxTableSetting` | - |
| `[isBusy]` | Show body skeleton loader | `boolean` | `false` |
| `[isHeaderBusy]` | Show header skeleton loader | `boolean` | `false` |
| `[isAvatar]` | Enables avatar column rendering | `boolean` | `false` |
| `[multiViewTable]` | Configuration for the table / canvas view switcher | `MultiViewTable` | - |
| `[pageSizeList]` | Bulk action / page size configuration | `BulkActions` | - |
| `[SelectedRows]` | Pre-selected single row keyed by field and value | `SelectedRowsConfig<T>` | - |
| `[SelectedCheckboxes]` | Pre-selected checkbox rows keyed by field and values | `SelectedCheckboxConfig<T>` | - |
| `[tableHeight]` | CSS height applied to the scroll container | `string \| undefined` | - |
| `[templateRef]` | Custom row template | `TemplateRef<any>` | - |
| `[recordTemplateRef]` | Custom record template | `TemplateRef<any>` | - |
| `[extraHeaderTemplateRef]` | Additional header toolbar template | `TemplateRef<any>` | - |
| `[dxEmptyTemplate]` | Custom empty state (string or template) | `string \| TemplateRef<void> \| null` | - |
| `[dxNotFoundImage]` | Empty state image identifier | `any` | `'default'` |
| `[dxNotFoundContent]` | Empty state message | `string \| TemplateRef<void> \| null` | - |
| `[dxNotFoundFooter]` | Empty state footer | `string \| TemplateRef<void>` | - |
| `[showDefaultEmptyContent]` | Show the built-in empty state template | `boolean` | `false` |
| `[isCheckBoxClearLogic]` | Clear checkbox selection when data source changes | `boolean` | `true` |
| `[isKanbanView]` | Toggle Kanban rendering | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onAction)` | Emitted when a row action is triggered | `EventEmitter<OnAction<DxTableData<T>>>` |
| `(onSort)` | Emitted when sort direction changes | `EventEmitter<Sort>` |
| `(onPaginationClick)` | Emitted on page navigation | `EventEmitter<PageEvent>` |
| `(onCheckboxChange)` | Emitted with the full list of selected rows | `EventEmitter<DxTableData<T>[]>` |
| `(onCheckboxSelectionChange)` | Emitted with the add/remove selection delta | `EventEmitter<SelectionChange<DxTableData<T>>>` |
| `(onRowSelection)` | Emitted when single/multi row selection changes | `EventEmitter<DxTableData<T>[]>` |
| `(onRowDrop)` | Emitted after a drag-and-drop reorder | `EventEmitter<DxTableData<T>[]>` |
| `(onClickRow)` | Emitted when a row is clicked (requires `setting.enableRowClick`) | `EventEmitter<DxTableData<T>>` |
| `(onClickMenuAction)` | Emitted when a row menu item is selected | `EventEmitter<DxTableMenuAction<T>>` |
| `(onClickSubMenu)` | Emitted when a sub-menu action is selected | `EventEmitter<SubmenuActionModel>` |
| `(onClickEditRow)` | Emitted when an inline row edit is triggered | `EventEmitter<DxTableRowEdit<T>>` |
| `(onClickOverlayButton)` | Emitted when a row overlay button is clicked | `EventEmitter<DxTableRowEdit<T>>` |
| `(onClickLookupLink)` | Emitted when a lookup cell link is clicked | `EventEmitter<TableLookupDataModel<T>>` |
| `(onTableRowIconClick)` | Emitted when a row icon is clicked | `EventEmitter<iconData<T>>` |
| `(onEventChange)` | Emitted on cell-level value change | `EventEmitter<DxTableData<T>>` |
| `(onToggleEventChange)` | Emitted when a slide-toggle cell changes | `EventEmitter<DxTableData<T>>` |
| `(onFilterClick)` | Emitted when a header filter action is triggered | `EventEmitter<DxFilter>` |
| `(onClickTableViewSwitcher)` | Emitted when the table/canvas switcher is clicked | `EventEmitter<TABLE_VIEW_TYPES>` |
| `(onClickTablePageSize)` | Emitted when page size changes | `EventEmitter<PageSize>` |
| `(onClickChangeViewAction)` | Emitted when a saved-view is selected | `EventEmitter<string>` |
| `(onClickCreateCustomView)` | Emitted when the user requests a custom view | `EventEmitter<void>` |
| `(onLeftDropDownSearch)` | Emitted from the left dropdown search input | `EventEmitter<string>` |
| `(onClickMarkAsDefault)` | Emitted when a view is marked as default | `EventEmitter<MenuAction>` |
| `(onRowRefresh)` | Emitted to request a row refresh | `EventEmitter<DxTableData<T>>` |
| `(activeTabChange)` | Emitted when the active table tab changes | `EventEmitter<number \| string>` |
| `(fileView)` | Emitted when a file cell preview is opened | `EventEmitter<{ file: any; element: HTMLImageElement }>` |

### Types

```typescript
interface DxTableColumn<T> {
  title: string;
  field: keyof T;
  type: DxTableColumnType;
  columnDef: string;
  sortable?: boolean;
  sticky?: 'start' | 'end';
  width?: string;
  setting?: TableSetting;
  footer?: Footer;
  menuOptions?: MenuOptions[];
  confirmationPopover?: ConfirmationPopover;
  sortMenu?: DxColumnSortMenuConfig;
  // ... see dx-table.interface.ts for the full shape
}

type DxTableColumnType =
  | 'text' | 'number' | 'currency' | 'date' | 'datetime'
  | 'email' | 'contact' | 'checkbox' | 'action' | 'avatar'
  | 'avatar_group' | 'input' | 'select' | 'multi_chip'
  | 'icon-text' | 'link' | 'menu' | 'context-menu'
  | 'service_data' | 'slide-toggle' | 'button' | 'inline-dropdown'
  | 'edit-row' | 'percentage' | 'dropdown' | 'filled_dropdown'
  | 'tag' | 'URL' | 'html' | 'lookup' | 'file' | 'ONLY_HTML'
  | 'flat-action' | 'custom' | 'hove-menu';
```

## Examples

### Basic table

```typescript
columns: DxTableColumn<User>[] = [
  { title: 'Name',   field: 'name',   type: 'text',     columnDef: 'name',   sortable: true },
  { title: 'Email',  field: 'email',  type: 'email',    columnDef: 'email' },
  { title: 'Joined', field: 'joined', type: 'date',     columnDef: 'joined' }
];

rows: DxTableData<User>[] = users.map(u => ({ data: u }));
```

```html
<dx-table [columns]="columns" [dataSource]="rows"></dx-table>
```

### Multi-select with bulk actions

```typescript
setting: DxTableSetting = { multiSelect: true };
```

```html
<dx-table
  [columns]="columns"
  [dataSource]="rows"
  [setting]="setting"
  (onCheckboxChange)="onSelection($event)">
</dx-table>
```

### Sortable + paginated

```html
<dx-table
  [columns]="columns"
  [dataSource]="rows"
  [pageSizeList]="pageSizeList"
  (onSort)="onSort($event)"
  (onPaginationClick)="onPage($event)">
</dx-table>
```

### Loading state

```html
<dx-table [columns]="columns" [dataSource]="rows" [isBusy]="true"></dx-table>
```

### Row click + actions

```typescript
setting: DxTableSetting = { enableRowClick: true };
```

```html
<dx-table
  [columns]="columns"
  [dataSource]="rows"
  [setting]="setting"
  (onClickRow)="openDetail($event)"
  (onAction)="handleAction($event)">
</dx-table>
```

## Import

```typescript
import { FlexTableModule } from '@ngdx/dijta';

@NgModule({
  imports: [FlexTableModule]
})
export class YourModule { }
```
