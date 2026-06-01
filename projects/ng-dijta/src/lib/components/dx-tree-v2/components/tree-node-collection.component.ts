import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { IReactionDisposer, reaction } from 'mobx';
import { observable, computed, action } from '../mobx-angular/mobx-proxy';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'tree-node-collection',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div >
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"
          [node]="node"
          [index]="i"
          [templates]="templates"
        >
        </tree-node>
      </div>
    </ng-container>
  `
})
export class TreeNodeCollectionComponent implements OnInit, OnDestroy {
  @Input()
  get nodes(): TreeNode[] {
    return this._nodes;
  }
  set nodes(nodes) {
    this.setNodes(nodes);
  }

  @Input() treeModel!: TreeModel;

  @observable _nodes!: TreeNode[];
  private virtualScroll!: TreeVirtualScroll; // Cannot inject this, because we might be inside treeNodeTemplateFull
  @Input() templates!: TemplateRef<any>;

  @observable viewportNodes!: TreeNode[];

  @computed get marginTop(): string {
    const firstNode: 0 | TreeNode =
      this.viewportNodes && this.viewportNodes?.length && this.viewportNodes[0];
    const relativePosition: number =
      firstNode && firstNode?.parent
        ? firstNode?.position -
        firstNode?.parent?.position -
        firstNode?.parent?.getSelfHeight()
        : 0;

    return `${relativePosition}px`;
  }

  _dispose!: IReactionDisposer[];

  @action setNodes(nodes: TreeNode[]): void {
    this._nodes = nodes;
  }

  ngOnInit(): any {
    this.virtualScroll = this.treeModel.virtualScroll;
    this._dispose = [
      // return node indexes so we can compare structurally,
      reaction(
        () => {
          return this.virtualScroll
            .getViewportNodes(this.nodes)
            .map((n: TreeNode) => n.index);
        },
        (nodeIndexes) => {
          this.viewportNodes = nodeIndexes?.map((i: number) => this.nodes[i]);
        },
        { compareStructural: true, fireImmediately: true } as any
      ),
      reaction(
        () => this.nodes,
        (nodes: TreeNode[]) => {
          this.viewportNodes = this.virtualScroll?.getViewportNodes(nodes);
        }
      )
    ];
  }

  ngOnDestroy(): void {
    this._dispose.forEach((d: IReactionDisposer) => d());
  }

  trackNode(index: number, node: TreeNode): number {
    return node.id;
  }
}
