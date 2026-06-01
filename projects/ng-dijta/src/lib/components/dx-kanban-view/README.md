---
category: Components
type: Data Display
title: Kanban View
---

A kanban-board layout that renders columns of draggable cards with CDK drag-drop, emitting events for column moves, in-column re-ordering, and per-card actions.

## When To Use

- When visualizing items that flow through stages (tasks, leads, applications, endorsements).
- When users need to drag cards between columns and re-order them within a column.
- When each card exposes contextual actions (edit, open, mark complete) that the host must handle.

## API

```html
<dx-kanban-view
  [dataSource]="board"
  (onColumnChange)="onColumnChange($event)"
  (onSequenceChange)="onSequenceChange($event)"
  (onKanbanCardAction)="onCardAction($event)">
</dx-kanban-view>
```

### dx-kanban-view

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[dataSource]` | Board definition (columns + card content) | `KanbanViewModel` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onColumnChange)` | Emitted when a card is moved to another column | `EventEmitter<KanbanBoardColumnChangeModel>` |
| `(onSequenceChange)` | Emitted when a card is re-ordered within a column | `EventEmitter<KanbanBoardSequenceChangeModel>` |
| `(onKanbanCardAction)` | Emitted when a card's contextual action is clicked | `EventEmitter<KanbanCardActionEvent>` |

### Types

```typescript
interface KanbanViewModel {
  name: string;
  columns: KanbanViewColumnsModel[];
}

interface KanbanViewColumnsModel {
  name: string;
  id: string;
  sequence: number;
  variant: 'standard';
  color?: string;
  apiConfig?: LookupApiConfig<any>;
  totalAmountUrl?: {
    currencyFormat?: {
      decimal?: number;
      currencyCode?: string;
      appCurrencyConfig?: NumberFormatVariant;
    };
    config: LookupApiConfig<any>;
  };
  content: KanbanViewColumnContent[];
}

interface KanbanBoardColumnChangeModel {
  transferedTo: string;
  data: KanbanViewColumnContent;
}

interface KanbanBoardSequenceChangeModel {
  currentColumnId: string;
  data: KanbanViewColumnContent[];
}

interface KanbanCardActionEvent {
  type: string;
  data: KanbanViewColumnContent;
}
```

## Examples

### Basic

```html
<dx-kanban-view [dataSource]="board"></dx-kanban-view>
```

### With drag-drop handling

```html
<dx-kanban-view
  [dataSource]="board"
  (onColumnChange)="persistColumnMove($event)"
  (onSequenceChange)="persistSequence($event)">
</dx-kanban-view>
```

### With card actions

```html
<dx-kanban-view
  [dataSource]="board"
  (onKanbanCardAction)="handleCardAction($event)">
</dx-kanban-view>
```

## Import

```typescript
import { DxKanbanViewModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxKanbanViewModule]
})
export class YourModule { }
```
