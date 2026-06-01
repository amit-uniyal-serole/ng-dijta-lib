---
category: Components
type: Data Display
title: Nested Table
---

Hierarchical tree table built on top of `mat-table`. Accepts a tree (or array of trees) of arbitrary records and renders an expandable, indented grid with configurable columns.

## When To Use

- When tabular data has parent-child relationships that should be expandable (e.g. categories with sub-categories, org chart).
- When you need Material-style rows and columns but with indentation and toggle controls per node.
- When the column set and display formatting are driven by the same `DxTableColumn<T>` definitions used by `dx-table`.
- When a busy / loading state is needed during async tree resolution.

## API

```html
<dx-treetable
  [tree]="tree"
  [columns]="columns"
  [isBusy]="loading"
  (nodeClicked)="onNodeClicked($event)">
</dx-treetable>
```

### dx-treetable

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[tree]` | Tree or array of trees to render | `Node<T> \| Node<T>[]` | `[]` |
| `[columns]` | Column definitions (shared with `dx-table`) | `DxTableColumn<T>[]` | `[]` |
| `[options]` | Display options for separators, hover highlight, header casing, column order | `Options<T>` | `{}` |
| `[isBusy]` | Show the loading state | `boolean` | `false` |
| `[footer]` | Render a footer row | `boolean` | `false` |
| `[height]` | Fixed pixel height of the table | `number` | `400` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(nodeClicked)` | Emitted when a node is expanded or collapsed; payload is the clicked node | `Subject<TreeTableNode<T>>` |

### Types

```typescript
interface Node<T> {
  value: DxTableData<T>;
  children: Node<T>[];
}

interface TreeTableNode<T> extends Node<T> {
  id: string;
  depth: number;
  isVisible: boolean;
  isExpanded: boolean;
}

interface Options<T> {
  verticalSeparator?: boolean;
  capitalisedHeader?: boolean;
  highlightRowOnHover?: boolean;
  customColumnOrder?: Array<keyof T> & string[];
  elevation?: number;
}
```

## Examples

### Basic tree

```typescript
columns: DxTableColumn<Category>[] = [
  { columnDef: 'name',  header: 'Name',  cell: r => r.name },
  { columnDef: 'count', header: 'Count', cell: r => r.count }
];

tree: Node<Category> = {
  value: { name: 'Root', count: 10 },
  children: [
    { value: { name: 'Child A', count: 4 }, children: [] },
    { value: { name: 'Child B', count: 6 }, children: [] }
  ]
};
```

```html
<dx-treetable [tree]="tree" [columns]="columns" />
```

### With loading state and custom options

```html
<dx-treetable
  [tree]="tree"
  [columns]="columns"
  [options]="{ highlightRowOnHover: true, capitalisedHeader: true }"
  [isBusy]="loading"
  [height]="600">
</dx-treetable>
```

## Import

```typescript
import { TreetableModule } from '@ngdx/dijta';

@NgModule({
  imports: [TreetableModule]
})
export class YourModule { }
```
