---
category: Components
type: Data Display
title: Canvas
---

A card-based list view that renders a collection of records as stackable canvas cards with built-in selection, pagination, bulk actions, view switching, and three layout variants (`canvas-1`, `canvas-2`, `canvas-3`). Shares inputs and events with `dx-table` so the same dataset can be rendered as either a table or a canvas.

## When To Use

- Presenting records as cards instead of table rows (profiles, activities, feeds).
- Switching between table and card views of the same dataset.
- When each record needs rich layout: avatar, title, badges, label/value body, actions.
- When bulk actions, server-side pagination, and multi-select are required.

## API

```html
<dx-canvas
  [canvasDataSource]="cards"
  [canvasSetting]="settings"
  [cardActions]="actionsColumn"
  (onCanvasCheckboxChange)="onSelect($event)"
  (onCanvasPaginationClick)="onPage($event)"
  (onClickCanvasAction)="onAction($event)">
</dx-canvas>
```

### dx-canvas

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[canvasDataSource]` | Records to render as cards | `DxCanvasData<T>[]` | - |
| `[canvasSetting]` | View type, pagination, selection, actions | `DxCanvasSetting` | - |
| `[cardActions]` | Per-card action column (shares the table column shape) | `DxTableColumn<T>` | - |
| `[multiViewTable]` | Config for the table/canvas view switcher | `MultiViewTable` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onCanvasCheckboxChange)` | Emitted when the selection set changes | `EventEmitter<DxCanvasData<T>[]>` |
| `(onCanvasPaginationClick)` | Emitted on page change | `EventEmitter<PageEvent>` |
| `(onClickCanvasHeaderAction)` | Emitted when a header filter action is clicked | `EventEmitter<DxFilter>` |
| `(onClickCanvasAction)` | Emitted when a card action is clicked | `EventEmitter<OnAction<T>>` |
| `(onClickCanvasViewSwitcher)` | Emitted when the table/canvas switcher changes | `EventEmitter<TABLE_VIEW_TYPES>` |
| `(onClickCanvasPageSize)` | Emitted when the page-size selector changes | `EventEmitter<PageSize>` |

### Types

```typescript
type CANVAS_VIEW_TYPES = 'canvas-1' | 'canvas-2' | 'canvas-3';

interface DxCanvasSetting {
  viewType?: CANVAS_VIEW_TYPES;
  toggleStickySettings?: boolean;
  pagination?: boolean;
  paginationFirstLastButtons?: boolean;
  multiSelect?: boolean;
  totalItems?: number;
  pageSize?: number;
  leftActions?: MenuAction[];
  rightActions?: MenuAction[];
  bulkActions?: BulkActions;
  multiActionButtonSettings?: MultiActionButtonSettings;
  leftSectionAvatar?: NgDxAvatarSettings;
  rightSectionAvatar?: NgDxAvatarSettings;
  leftDropDown?: BulkActions;
  paginatorMultiSelect?: boolean;
}

interface DxCanvasData<T> {
  id?: number;
  card?: {
    data?: T;
    isSticky?: boolean;
    left?: { class?: string[]; avatar?: DxTableNgDxAvatar };
    center?: DxCanvasCenterContent;
    right?: DxCanvasRightSection;
  };
}

interface DxCanvasCenterContent {
  title?: string;
  badge?: string;
  subTitle?: { valueTt: string; align?: 'right' | 'bottom' };
  body?: DxCanvasContent;
  footer?: DxCanvasContent;
}
```

## Examples

### Basic canvas list

```typescript
settings: DxCanvasSetting = {
  viewType: 'canvas-1',
  pagination: true,
  multiSelect: true,
  pageSize: 20,
  totalItems: 200,
};

cards: DxCanvasData<Item>[] = items.map(item => ({
  card: {
    data: item,
    left: { avatar: { avatarName: item.name } },
    center: {
      title: item.name,
      subTitle: { valueTt: item.status, align: 'right' },
      body: { source: [{ labelTt: 'Owner', valueTt: item.owner, type: 'text' }] },
    },
  },
}));
```

```html
<dx-canvas
  [canvasDataSource]="cards"
  [canvasSetting]="settings"
  (onCanvasPaginationClick)="loadPage($event)"
  (onCanvasCheckboxChange)="selected = $event">
</dx-canvas>
```

### With sticky cards and view switcher

```html
<dx-canvas
  [canvasDataSource]="cards"
  [canvasSetting]="{ viewType: 'canvas-2', toggleStickySettings: true, pagination: true }"
  [multiViewTable]="multiViewConfig"
  (onClickCanvasViewSwitcher)="onViewChange($event)">
</dx-canvas>
```

## Import

```typescript
import { DxCanvasModule } from '@ngdx/dijta';

@NgModule({ imports: [DxCanvasModule] })
export class YourModule { }
```
