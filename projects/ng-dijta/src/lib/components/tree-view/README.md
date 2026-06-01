---
category: Components
type: Data Display
title: Tree View
---

A hierarchical tree view built on top of Angular CDK `CdkTree`. Provides the tree root, node component, toggle / checkbox / option children, indentation, padding, outlets, and an optional virtual-scroll variant. Supports `dxDataSource` (array / observable / `DataSource`) and a `TreeControl` for expansion state.

## When To Use

- When rendering hierarchical data (folders, org charts, nested categories).
- When nodes need disclosure toggles, selection checkboxes, and indentation lines.
- When the tree is large enough to need virtual scrolling.
- When navigating folder-style data sets (pass `dxDirectoryTree`).

## API

```html
<dx-tree-view [dxDataSource]="dataSource" [dxTreeControl]="treeControl">
  <dx-tree-node *dxTreeNodeDef="let node" dxTreeNodeIndentLine>
    <dx-tree-node-toggle dxTreeNodeNoopToggle></dx-tree-node-toggle>
    {{ node.name }}
  </dx-tree-node>

  <dx-tree-node *dxTreeNodeDef="let node; when: hasChild" dxTreeNodeIndentLine>
    <dx-tree-node-toggle>
      <i class="toggle-icon"></i>
    </dx-tree-node-toggle>
    {{ node.name }}
  </dx-tree-node>
</dx-tree-view>
```

### Sub-components

| Selector | Component / Directive | Description |
|----------|------------------------|-------------|
| `dx-tree-view` | `DxTreeViewComponent` | Tree root; accepts `[dxDataSource]` and `[dxTreeControl]` |
| `dx-tree-virtual-scroll-view` | `DxTreeVirtualScrollViewComponent` | Tree root with CDK virtual scrolling |
| `dx-tree-node` | `DxTreeNodeComponent` | Renders a single node with indents and content projection |
| `[dxTreeNodeDef]` | `DxTreeNodeDefDirective` | Per-node template definition (with optional `when` predicate) |
| `[dxTreeNodeOutlet]` | `DxTreeNodeOutletDirective` | Outlet where node views are rendered |
| `[dxTreeVirtualScrollNodeOutlet]` | `DxTreeVirtualScrollNodeOutletDirective` | Outlet variant used by the virtual-scroll view |
| `dx-tree-node-toggle` / `[dxTreeNodeToggle]` | `DxTreeNodeToggleDirective` | Click target that expands / collapses the node |
| `dx-tree-node-toggle[dxTreeNodeNoopToggle]` | `DxTreeNodeNoopToggleDirective` | No-op toggle placeholder (used for leaves) |
| `[dxTreeNodeToggleRotateIcon]` | `DxTreeNodeToggleRotateIconDirective` | Applies a rotate animation class when expanded |
| `[dxTreeNodeToggleActiveIcon]` | `DxTreeNodeToggleActiveIconDirective` | Applies an "active" class when expanded |
| `dx-tree-node-checkbox` | `DxTreeNodeCheckboxComponent` | Checkbox for node selection |
| `dx-tree-node-option` | `DxTreeNodeOptionComponent` | Selectable option within a node |
| `dx-tree-node-indents` | `DxTreeNodeIndentsComponent` | Renders indentation lines for a node |
| `dx-tree-node[dxTreeNodeIndentLine]` | `DxTreeNodeIndentLineDirective` | Enables indentation lines on a node |
| `[dxTreeNodePadding]` | `DxTreeNodePaddingDirective` | Applies level-based left padding |

### dx-tree-view

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[dxDataSource]` | Data source feeding the tree | `DataSource<T> \| Observable<T[]> \| T[]` | - |
| `[dxTreeControl]` | CDK `TreeControl` managing expansion and levels | `TreeControl<T>` | - |
| `[dxDirectoryTree]` | Render in directory-tree style | `boolean` | `false` |
| `[dxBlockNode]` | Render nodes as block-level elements | `boolean` | `false` |

### Data sources

A helper `DxTreeFlatDataSource` and utilities are re-exported for building flat / nested data sources (see `./data-source` and `./utils`).

## Examples

### Flat tree with expansion toggles

```typescript
interface FlatNode { expandable: boolean; name: string; level: number }

treeControl = new FlatTreeControl<FlatNode>(n => n.level, n => n.expandable);
dataSource = new DxTreeFlatDataSource(this.treeControl, transformer, flattener);

hasChild = (_: number, n: FlatNode) => n.expandable;
```

```html
<dx-tree-view [dxDataSource]="dataSource" [dxTreeControl]="treeControl">
  <dx-tree-node *dxTreeNodeDef="let node" dxTreeNodePadding>
    <dx-tree-node-toggle dxTreeNodeNoopToggle></dx-tree-node-toggle>
    {{ node.name }}
  </dx-tree-node>

  <dx-tree-node *dxTreeNodeDef="let node; when: hasChild" dxTreeNodePadding>
    <dx-tree-node-toggle>
      <i class="chevron" dxTreeNodeToggleRotateIcon></i>
    </dx-tree-node-toggle>
    {{ node.name }}
  </dx-tree-node>
</dx-tree-view>
```

### Tree with checkboxes

```html
<dx-tree-view [dxDataSource]="dataSource" [dxTreeControl]="treeControl">
  <dx-tree-node *dxTreeNodeDef="let node" dxTreeNodePadding>
    <dx-tree-node-toggle dxTreeNodeNoopToggle></dx-tree-node-toggle>
    <dx-tree-node-checkbox [checked]="isSelected(node)" (click)="toggleSelect(node)">
    </dx-tree-node-checkbox>
    {{ node.name }}
  </dx-tree-node>
</dx-tree-view>
```

### Virtual-scrolled tree

```html
<dx-tree-virtual-scroll-view
  [dxDataSource]="dataSource"
  [dxTreeControl]="treeControl"
  [itemSize]="28">
  <dx-tree-node *dxTreeNodeDef="let node" dxTreeNodePadding>
    <dx-tree-node-toggle dxTreeNodeNoopToggle></dx-tree-node-toggle>
    {{ node.name }}
  </dx-tree-node>
</dx-tree-virtual-scroll-view>
```

## Import

```typescript
import { DxTreeViewModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTreeViewModule]
})
export class YourModule { }
```
