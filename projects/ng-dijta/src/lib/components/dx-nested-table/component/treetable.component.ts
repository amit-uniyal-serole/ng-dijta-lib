import { Component, OnInit, Input, Output, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { Node, TreeTableNode, Options, SearchableNode } from '../models';
import { TreeService } from '../services/tree/tree.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConverterService } from '../services/converter/converter.service';
import { flatMap, defaults } from 'lodash';
import { Subject } from 'rxjs';
import { DxTableColumn } from '../../dx-table';

@Component({
  selector: 'dx-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreetableComponent<T> implements OnChanges {
  @Input()
  tree: Node<T> | Node<T>[] = [];
  @Input() options: Options<T> = {};
  @Output() nodeClicked: Subject<TreeTableNode<T>> = new Subject();
  @Input() columns: Array<DxTableColumn<T>> = [];
  @Input() isBusy: boolean = false;
  @Input() height: number = 400;
  @Input() footer: boolean = false;
  private searchableTree: SearchableNode<T>[] = [];
  private treeTable: TreeTableNode<T>[] = [];
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<TreeTableNode<T>>;

  constructor(
    private treeService: TreeService,
    private converterService: ConverterService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.tree?.currentValue !== changes?.tree?.previousValue) {
      this.tree = Array.isArray(this.tree) ? this.tree : [this.tree];
      this.displayedColumns = this.getAllHeaderRef(this.columns);
      if (this.tree.length > 0) {
        this.searchableTree = this.tree.map(t => this.converterService.toSearchableTree(t));
        const treeTableTree = this.searchableTree.map(st => this.converterService.toTreeTableTree(st));
        this.treeTable = flatMap(treeTableTree, this.treeService.flatten);
        this.dataSource = this.generateDataSource();
      }
    }

  }

  private getAllHeaderRef(columns: Array<DxTableColumn<T>>): string[] {
    return columns?.map((col: DxTableColumn<T>) => col?.columnDef);
  }

  extractNodeProps(tree: Node<T> & { value: { [k: string]: any } }): string[] {
    return Object.keys(tree.value).filter(x => typeof tree.value[x] !== 'object');
  }

  generateDataSource(): MatTableDataSource<TreeTableNode<T>> {
    return new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
  }

  formatIndentation(node: TreeTableNode<T>, step: number = 5): string {
    return '&nbsp;&nbsp;'.repeat(node.depth * step);
  }


  onNodeClick(clickedNode: TreeTableNode<T>): void {
    clickedNode.isExpanded = !clickedNode.isExpanded;
    this.treeTable.forEach(el => {
      el.isVisible = this.searchableTree.every(st => {
        return this.treeService.searchById(st, el.id).
          fold([], n => n.pathToRoot)
          .every(p => this.treeTable.find(x => x.id === p.id)?.isExpanded);
      });
    });
    this.dataSource = this.generateDataSource();
    this.nodeClicked.next(clickedNode);
  }

  // Overrides default options with those specified by the user
  parseOptions(defaultOpts: Options<T>): Options<T> {
    return defaults(this.options, defaultOpts);
  }

}