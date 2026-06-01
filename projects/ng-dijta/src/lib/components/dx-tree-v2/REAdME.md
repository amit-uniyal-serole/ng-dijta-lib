---
category: Components
type: Data Display
title: TreeV2
---

A feature-rich hierarchical tree built on an embedded angular-tree-component engine. Adds virtualization, filtering, async children loading, drag-and-drop, and a rich event stream on top of `<dx-tree>`.

## When To Use
- When the node count is large enough that virtualized rendering is required.
- When nodes need to load children asynchronously from a server.
- When selection, activation, focus, and navigation events must be observable separately.
- When drag/copy/move across branches must be supported with structural events.

## API

```html
<dx-tree-v2
  [nodes]="nodes"
  [options]="options"
  [showLine]="true"
  (onActivate)="onActivate($event)"
  (onMoveNode)="onMove($event)">
</dx-tree-v2>
```

### dx-tree-v2

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[nodes]` | Tree data (required) | `ITreeNode` | - |
| `[options]` | Tree configuration (children field, id field, async loader, actionMapping, allowDrag, virtualization, filter, etc.) | `ITreeOptions` | - |
| `[showLine]` | Render connector lines between nodes | `boolean` | `false` |

### Events

All events emit a `TreeEvent` payload.

| Event | Description | Type |
|-------|-------------|------|
| `(onToggleExpanded)` | Emitted when a node's expanded state changes | `EventEmitter<TreeEvent>` |
| `(onActivate)` | Emitted when a node becomes active | `EventEmitter<TreeEvent>` |
| `(onDeactivate)` | Emitted when a node is deactivated | `EventEmitter<TreeEvent>` |
| `(onNodeActivate)` | Emitted for each node activation | `EventEmitter<TreeEvent>` |
| `(onNodeDeactivate)` | Emitted for each node deactivation | `EventEmitter<TreeEvent>` |
| `(onSelect)` | Emitted when a node is selected | `EventEmitter<TreeEvent>` |
| `(onDeselect)` | Emitted when a node is deselected | `EventEmitter<TreeEvent>` |
| `(onFocus)` | Emitted when a node receives focus | `EventEmitter<TreeEvent>` |
| `(onBlur)` | Emitted when a node loses focus | `EventEmitter<TreeEvent>` |
| `(onUpdateData)` | Emitted when the tree data is updated | `EventEmitter<TreeEvent>` |
| `(onInitialized)` | Emitted once the tree has initialised | `EventEmitter<TreeEvent>` |
| `(onMoveNode)` | Emitted when a node is moved via drag-and-drop | `EventEmitter<TreeEvent>` |
| `(onCopyNode)` | Emitted when a node is copied | `EventEmitter<TreeEvent>` |
| `(onLoadNodeChildren)` | Emitted when children finish loading asynchronously | `EventEmitter<TreeEvent>` |
| `(onChangeFilter)` | Emitted when the filter text changes | `EventEmitter<TreeEvent>` |
| `(onEvent)` | Emitted for every internal event | `EventEmitter<TreeEvent>` |
| `(onStateChange)` | Emitted when the tree state changes | `EventEmitter<TreeEvent>` |

### Types

```typescript
interface TreeEvent {
  eventName?: any;
  node?: TreeNode;
  treeModel?: TreeModel;
  isExpanded?: boolean;
  to?: any;
  from?: any;
}
```

Refer to the bundled `ITreeNode` and `ITreeOptions` interfaces (re-exported from `@ngdx/dijta`) for the full node and options shapes.

## Examples

### Basic

```typescript
nodes = [
  { id: 1, name: 'Root', children: [
    { id: 2, name: 'Child A' },
    { id: 3, name: 'Child B' },
  ]},
];

options: ITreeOptions = {};
```

```html
<dx-tree-v2 [nodes]="nodes" [options]="options"></dx-tree-v2>
```

### Drag-and-drop with move handler

```typescript
options: ITreeOptions = {
  allowDrag: true,
  allowDrop: true,
};
```

```html
<dx-tree-v2
  [nodes]="nodes"
  [options]="options"
  (onMoveNode)="persistMove($event)">
</dx-tree-v2>
```

### Async children loading

```typescript
options: ITreeOptions = {
  getChildren: (node) => this.api.loadChildren(node.data.id),
};
```

```html
<dx-tree-v2 [nodes]="nodes" [options]="options"></dx-tree-v2>
```

### With connector lines

```html
<dx-tree-v2
  [nodes]="nodes"
  [options]="options"
  [showLine]="true">
</dx-tree-v2>
```

## Import

```typescript
import { DxTreeV2Module } from '@ngdx/dijta';

@NgModule({
  imports: [DxTreeV2Module]
})
export class YourModule { }
```
