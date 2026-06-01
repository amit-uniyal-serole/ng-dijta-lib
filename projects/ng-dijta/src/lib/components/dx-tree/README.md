## Dx-Tree

`<dx-tree [treeNodePadding]="treeNodePadding" [treeDataSource]="treeDataSource" [draggable]="true" (nodeClick)="nodeClick($event)" (onTreeChange)="onTreeChange($event)"></dx-tree>`

## Input

| Input                                | Data need to be passed as input                                    |
| ------------------------------------ | ------------------------------------------------------------------ |
| **treeDataSource** (TREE_MODEL<T>[]) | `tree data`                                                        |
| **draggable** (boolean)              | `draggable `                                                       |
| **isExpanded** (boolean)             | `expand all folders`                                               |
| **hideIcons** (boolean)              | `hide folder icons`                                                |
| **treeNodePadding** (number)         | `padding will be doubled on increase of each level (default is 7)` |
| **isBorder** (boolean)               | `apply border to tree`                                             |
| **isAllCollapseBtn** (boolean)       | `display expand/collapse icon`                                     |
| **isAllCollapseBtn** (boolean)       | `display expand/collapse icon`                                     |
| **isRootNodeBold** (boolean)         | `apply bold style`                                                 |

## Events

| Event            | Time of triggering            | return type      |
| ---------------- | ----------------------------- | ---------------- |
| **nodeClick**    | `on click tree item`          | **ItemFlatNode** |
| **onTreeChange** | `on change of tree structure` | **ItemNode[]**   |
