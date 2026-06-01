---
category: Components
type: Data Display
title: Tree
---

A hierarchical tree built on Angular Material `mat-tree` with flattening, expand/collapse, optional drag-and-drop, and per-node icons. Nodes are bound through a generic `TREE_MODEL<T>` so the payload remains strongly typed.

## When To Use
- When data has parent/child relationships (folder trees, org charts, category hierarchies).
- When nodes must be rearranged interactively via drag-and-drop.
- When the caller needs fine-grained click handling on nodes.
- When expand-all/collapse-all behaviour is required alongside standard toggling.

## API

```html
<dx-tree
  [treeDataSource]="nodes"
  [draggable]="true"
  [isExpanded]="true"
  (nodeClick)="onSelect($event)"
  (onTreeChange)="onStructureChange($event)">
</dx-tree>
```

### dx-tree

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[treeDataSource]` | Tree data rendered by the component (required) | `TREE_MODEL<T>[]` | - |
| `[draggable]` | Enable drag-and-drop reordering of nodes | `boolean` | `false` |
| `[isExpanded]` | Expand all nodes on initialization | `boolean` | `true` |
| `[hideIcons]` | Hide the leading icon on every node | `boolean` | `false` |
| `[isBorder]` | Render a border around the tree container | `boolean` | `false` |
| `[isAllCollapseBtn]` | Show the expand-all/collapse-all toolbar button | `boolean` | `false` |
| `[treeNodePadding]` | Horizontal indent per tree level, in pixels | `number` | `7` |
| `[selected]` | Value used to mark the currently selected node | `any` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(nodeClick)` | Emitted when a node is clicked | `EventEmitter<ItemFlatNode<T>>` |
| `(onTreeChange)` | Emitted when the tree structure changes (drag-and-drop, add, delete) | `EventEmitter<ItemNode<T>[]>` |

### Methods

| Method | Description |
|--------|-------------|
| `toggleTree(expand: boolean)` | Expand or collapse all nodes |
| `addNewItem(node: ItemFlatNode<T>)` | Insert a new empty child under the given node |
| `saveNode(node: ItemFlatNode<T>, value: string)` | Persist a new value on the given node |
| `delete(node: ItemFlatNode<T>)` | Remove a node from the tree |

### Types

```typescript
interface TREE_MODEL<T> {
  keyTt: string;
  labelTt: string;
  source?: T;
  matIcon?: string;
  label?: string;
  isActive?: boolean;
  imgSrc?: string;
  isCompleted?: boolean;
  nodeClasses?: string[];
  children?: TREE_MODEL<T>[];
  isParentNode?: boolean;
}

class ItemNode<T> {
  children!: ItemNode<T>[];
  item!: string;
  data?: TREE_MODEL<T>;
}

class ItemFlatNode<T> {
  item!: string;
  level!: number;
  expandable!: boolean;
  data?: TREE_MODEL<T>;
}
```

## Examples

### Basic

```typescript
nodes: TREE_MODEL<unknown>[] = [
  {
    keyTt: 'root',
    labelTt: 'Root',
    label: 'Root',
    children: [
      { keyTt: 'child-1', labelTt: 'Child 1', label: 'Child 1' },
      { keyTt: 'child-2', labelTt: 'Child 2', label: 'Child 2' },
    ],
  },
];
```

```html
<dx-tree [treeDataSource]="nodes"></dx-tree>
```

### Draggable with structure-change events

```html
<dx-tree
  [treeDataSource]="nodes"
  [draggable]="true"
  (onTreeChange)="persist($event)">
</dx-tree>
```

### With icons per node

```typescript
nodes: TREE_MODEL<unknown>[] = [
  { keyTt: 'docs', labelTt: 'Docs',   label: 'Docs',   matIcon: 'folder' },
  { keyTt: 'imgs', labelTt: 'Images', label: 'Images', matIcon: 'image'  },
];
```

```html
<dx-tree [treeDataSource]="nodes"></dx-tree>
```

### Collapsed by default with toolbar

```html
<dx-tree
  [treeDataSource]="nodes"
  [isExpanded]="false"
  [isAllCollapseBtn]="true"
  [isBorder]="true">
</dx-tree>
```

## Import

```typescript
import { DxTreeModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTreeModule]
})
export class YourModule { }
```
