import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { DxTreeFlattener,   DxTreeFlatDataSource } from 'projects/ng-dijta/src/public-api';


interface TreeNode {
  name: string;
  key: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'parent 1',
    key: '1',
    children: [
      {
        name: 'parent 1-0',
        key: '1-0',
        children: [
          { name: 'leaf', key: '1-0-0' },
          { name: 'leaf', key: '1-0-1' }
        ]
      },
      {
        name: 'parent 1-1',
        key: '1-1',
        children: [{ name: 'leaf', key: '1-1-0' }]
      }
    ]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  key: string;
  level: number;
}

@Component({
  selector: 'dx-demo-tree-view-editable',
  template: `
    <dx-tree-view [dxTreeControl]="treeControl" [dxDataSource]="dataSource" [trackBy]="trackBy">
      <dx-tree-node *dxTreeNodeDef="let node" dxTreeNodeIndentLine>
        <dx-tree-node-option
          [dxDisabled]="node.disabled"
          [dxSelected]="selectListSelection.isSelected(node)"
          (dxClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </dx-tree-node-option>
        <button dxType="text" dxSize="small" (click)="delete(node)">
          <mat-icon>minimize</mat-icon>
        </button>
       
      </dx-tree-node>

      <dx-tree-node *dxTreeNodeDef="let node; when: hasNoContent" dxTreeNodeIndentLine>
        <input placeholder="Input node name" dxSize="small" #inputElement />
        &nbsp;
        <button (click)="saveNode(node, inputElement.value)">Add</button>
      </dx-tree-node>

      <dx-tree-node *dxTreeNodeDef="let node; when: hasChild" dxTreeNodeIndentLine>
        <dx-tree-node-toggle>
           <mat-icon dxTreeNodeToggleRotateIcon>arrow_drop_down</mat-icon>
        </dx-tree-node-toggle>
        {{ node.name }}
        <button (click)="addNewNode(node)">
          <dx-icon dxType="plus" dxTheme="outline" />
        </button>
      </dx-tree-node>
    </dx-tree-view>
  `,
  styles: [``]
})
export class TreeViewComponent {
  private transformer = (node: TreeNode, level: number): FlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.key === node.key
        ? existingNode
        : {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level,
            key: node.key
          };
    flatNode.name = node.name;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeData = TREE_DATA;
  flatNodeMap = new Map<FlatNode, TreeNode>();
  nestedNodeMap = new Map<TreeNode, FlatNode>();
  selectListSelection = new SelectionModel<FlatNode>(true);

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );
  treeFlattener = new DxTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new DxTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.setData(this.treeData);
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  hasNoContent = (_: number, node: FlatNode): boolean => node.name === '';
  trackBy = (_: number, node: FlatNode): string => `${node.key}-${node.name}`;

  delete(node: FlatNode): void {
    const originNode = this.flatNodeMap.get(node);

    const dfsParentNode = (): TreeNode | null => {
      const stack = [...this.treeData];
      while (stack.length > 0) {
        const n = stack.pop()!;
        if (n.children) {
          if (n.children.find(e => e === originNode)) {
            return n;
          }

          for (let i = n.children.length - 1; i >= 0; i--) {
            stack.push(n.children[i]);
          }
        }
      }
      return null;
    };

    const parentNode = dfsParentNode();
    if (parentNode && parentNode.children) {
      parentNode.children = parentNode.children.filter(e => e !== originNode);
    }

    this.dataSource.setData(this.treeData);
  }
  addNewNode(node: FlatNode): void {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push({
        name: '',
        key: `${parentNode.key}-${parentNode.children.length}`
      });
      this.dataSource.setData(this.treeData);
      this.treeControl.expand(node);
    }
  }

  saveNode(node: FlatNode, value: string): void {
    const nestedNode = this.flatNodeMap.get(node);
    if (nestedNode) {
      nestedNode.name = value;
      this.dataSource.setData(this.treeData);
    }
  }
}
