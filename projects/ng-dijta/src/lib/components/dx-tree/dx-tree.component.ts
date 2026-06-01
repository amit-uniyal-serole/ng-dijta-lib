import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTree,
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { TreeUtil } from './tree-util';
import { ItemFlatNode, ItemNode, TREE_MODEL } from './tree.model';

@Component({
  selector: 'dx-tree',
  templateUrl: './dx-tree.component.html',
  styleUrls: ['./dx-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxTreeComponent<T> implements OnInit, OnChanges {
  @Input() treeDataSource!: TREE_MODEL<T>[];
  @Input() draggable: boolean = false;
  @Input() isExpanded: boolean = true;
  @Input() hideIcons: boolean = false;
  @Input() treeNodePadding: number = 7;
  @Input() isBorder: boolean = false;
  @Input() isAllCollapseBtn: boolean = false;
  @Input() selected: any;
  @Output() nodeClick: EventEmitter<ItemFlatNode<T>> =
    new EventEmitter<ItemFlatNode<T>>();
  @Output() onTreeChange: EventEmitter<ItemNode<T>[]> = new EventEmitter<
    ItemNode<T>[]
  >();
  @ViewChild('treeSelector') tree!: MatTree<any>;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap: Map<ItemFlatNode<T>, ItemNode<T>> = new Map<ItemFlatNode<T>, ItemNode<T>>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap: Map<ItemNode<T>, ItemFlatNode<T>> = new Map<ItemNode<T>, ItemFlatNode<T>>();

  /** A selected parent node to be inserted */
  selectedParent: ItemFlatNode<T> | null = null;

  /** The new item's name */
  newItemName: string = '';
  treeControl!: FlatTreeControl<ItemFlatNode<T>>;
  treeFlattener!: MatTreeFlattener<ItemNode<T>, ItemFlatNode<T>>;
  dataSource!: MatTreeFlatDataSource<ItemNode<T>, ItemFlatNode<T>>;

  /* Drag and drop */
  dragNode!: ItemFlatNode<T> | null;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode!: ItemFlatNode<T> | null;
  dragNodeExpandOverTime!: number;
  dragNodeExpandOverArea!: string;
  treeUtil!: TreeUtil<T>;

  ngOnInit(): void {
    this.treeUtil = new TreeUtil(this.treeDataSource);
    this.matTreeFlatter()
    this.flatTreeControl()
    this.dataSourceChange()
    if (this.isExpanded) {
      this.toggleTree(this.isExpanded);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.treeDataSource.currentValue !== changes.treeDataSource.previousValue) {
      this.treeUtil = new TreeUtil(this.treeDataSource);
      this.matTreeFlatter()
      this.flatTreeControl()
      this.dataSourceChange()
      if (this.isExpanded) {
        this.toggleTree(this.isExpanded);
      }
    }

  }

  matTreeFlatter(): void {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
  }
  flatTreeControl(): void {
    this.treeControl = new FlatTreeControl<ItemFlatNode<T>>(
      this.getLevel,
      this.isExpandable
    );
  }
  dataSourceChange(): void {
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.treeUtil?.dataChange?.subscribe((data: ItemNode<T>[]) => {      

      if (data) {
        this.dataSource.data = [];
        this.dataSource.data = data;
        this.onTreeChange.emit(data);
      }
    });
  }
  getLevel = (node: ItemFlatNode<T>) => node?.level;

  isExpandable = (node: ItemFlatNode<T>) => node?.expandable;

  getChildren = (node: ItemNode<T>): ItemNode<T>[] => node?.children;

  hasChild = (_: number, _nodeData: ItemFlatNode<T>) => _nodeData?.expandable;

  hasNoContent = (_: number, _nodeData: ItemFlatNode<T>) => _nodeData?.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: ItemNode<T>, level: number): ItemFlatNode<T> => {
    const existingNode: ItemFlatNode<T> | undefined = this.nestedNodeMap?.get(node);
    const flatNode: ItemFlatNode<T> =
      existingNode && existingNode?.item === node?.item
        ? existingNode
        : new ItemFlatNode();
    flatNode.item = node?.item;
    flatNode.level = level;
    flatNode.data = node?.data
    flatNode.expandable = node?.children && node?.children?.length > 0;
    this.flatNodeMap?.set(flatNode, node);
    this.nestedNodeMap?.set(node, flatNode);

    return flatNode;
  };

  /** Select the category so we can insert the new item. */
  addNewItem(node: ItemFlatNode<T>): void {
    const parentNode: ItemNode<T> | undefined = this.flatNodeMap?.get(node);
    this.treeUtil?.insertItem(parentNode!, '');
    this.treeControl?.expand(node);
  }

  /** Save the node to database */
  saveNode(node: ItemFlatNode<T>, itemValue: string): void {
    const nestedNode: ItemNode<T> | undefined = this.flatNodeMap?.get(node);
    this.treeUtil?.updateItem(nestedNode!, itemValue);
  }

  handleDragStart(_event: Event, node: ItemFlatNode<T>): void {
    this.dragNode = node;
    this.treeControl?.collapse(node);
  }

  // @ts-ignore currently we have to put any we are finding some solution for this
  handleDragOver(event: MouseEvent, node: ItemFlatNode<T>): void {
    const Event: HTMLInputElement = event?.target as HTMLInputElement;
    event?.preventDefault();

    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl?.isExpanded(node)) {
        if (
          new Date()?.getTime() - this.dragNodeExpandOverTime >
          this.dragNodeExpandOverWaitTimeMs
        ) {
          this.treeControl?.expand(node);
        }
      }
    } else {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date()?.getTime();
    }

    // Handle drag area
    const percentageX: number = event?.offsetX / Event?.clientWidth;
    const percentageY: number = event?.offsetY / Event?.clientHeight;
    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageY > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  handleDrop(event: Event, node: ItemFlatNode<T>): void {
    event?.preventDefault();
    if (node !== this.dragNode) {
      let newItem: ItemNode<T>;
      if (this.dragNodeExpandOverArea === 'above') {
        newItem = this.treeUtil?.copyPasteItemAbove(
          this.flatNodeMap?.get(this.dragNode!)!,
          this.flatNodeMap?.get(node)!
        );
      } else if (this.dragNodeExpandOverArea === 'below') {
        newItem = this.treeUtil?.copyPasteItemBelow(
          this.flatNodeMap?.get(this.dragNode!)!,
          this.flatNodeMap?.get(node)!
        );
      } else {
        newItem = this.treeUtil?.copyPasteItem(
          this.flatNodeMap?.get(this.dragNode!)!,
          this.flatNodeMap?.get(node)!
        );
      }
      this.treeUtil?.deleteItem(this.flatNodeMap?.get(this.dragNode!)!);
      this.treeControl?.expandDescendants(this.nestedNodeMap?.get(newItem)!);
    }
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  handleDragEnd(_event: Event): void {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }
  onNodeClick(node: ItemFlatNode<T>): void {
    this.nodeClick?.emit(node);
  }
  delete(node: ItemFlatNode<T>): void {
    this.treeUtil?.deleteItem(this.flatNodeMap?.get(node)!);
  }
  toggleTree(expand: boolean): void {
    if (expand) {
      this.treeControl?.expandAll();
      this.isExpanded = true;
    } else {
      this.treeControl?.collapseAll();
      this.isExpanded = false;
    }
  }
}
