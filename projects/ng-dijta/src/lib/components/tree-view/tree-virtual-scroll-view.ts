
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BaseTreeControl, CdkTree, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';


import { DxTreeVirtualNodeData, DxTreeVirtualScrollNodeOutletDirective } from './node';
import { DxTreeNodeOutletDirective } from './outlet';
import { DxTreeView } from './tree';
import { DxSafeAny } from '../../core';

const DEFAULT_SIZE = 28;

@Component({
  selector: 'dx-tree-virtual-scroll-view',
  exportAs: 'dxTreeVirtualScrollView',
  template: `
    <div class="dx-tree-list">
      <cdk-virtual-scroll-viewport
        class="dx-tree-list-holder"
        [itemSize]="dxItemSize"
        [minBufferPx]="dxMinBufferPx"
        [maxBufferPx]="dxMaxBufferPx"
      >
        <ng-container *cdkVirtualFor="let item of nodes; let i = index; trackBy: innerTrackBy">
          <ng-template dxTreeVirtualScrollNodeOutlet [data]="item" [compareBy]="compareBy"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>
    </div>
    <ng-container dxTreeNodeOutlet></ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DxTreeView, useExisting: forwardRef(() => DxTreeVirtualScrollViewComponent) },
    { provide: CdkTree, useExisting: forwardRef(() => DxTreeVirtualScrollViewComponent) }
  ],
  host: {
    class: 'dx-tree',
    '[class.dx-tree-block-node]': 'dxDirectoryTree || dxBlockNode',
    '[class.dx-tree-directory]': 'dxDirectoryTree',
    '[class.dx-tree-rtl]': `dir === 'rtl'`
  },
})
export class DxTreeVirtualScrollViewComponent<T> extends DxTreeView<T> implements OnChanges {
  @ViewChild(DxTreeNodeOutletDirective, { static: true }) readonly nodeOutlet!: DxTreeNodeOutletDirective;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) readonly virtualScrollViewport!: CdkVirtualScrollViewport;

  @Input() dxItemSize = DEFAULT_SIZE;
  @Input() dxMinBufferPx = DEFAULT_SIZE * 5;
  @Input() dxMaxBufferPx = DEFAULT_SIZE * 10;
  @Input() override trackBy: TrackByFunction<T> = null!;
  nodes: Array<DxTreeVirtualNodeData<T>> = [];
  innerTrackBy: TrackByFunction<DxTreeVirtualNodeData<T>> = i => i;

  ngOnChanges({ trackBy }: SimpleChanges): void {
    if (trackBy) {
      if (typeof trackBy.currentValue === 'function') {
        this.innerTrackBy = (index: number, n) => this.trackBy(index, n.data);
      } else {
        this.innerTrackBy = i => i;
      }
    }
  }

  get compareBy(): ((value: T) => DxSafeAny) | null {
    const baseTreeControl = this.treeControl as BaseTreeControl<T, DxSafeAny>;
    if (baseTreeControl.trackBy) {
      return baseTreeControl.trackBy;
    }

    return null;
  }

  override renderNodeChanges(data: T[] | readonly T[]): void {
    this.nodes = new Array(...data).map((n, i) => this.createNode(n, i));
    this._dataSourceChanged.next();
    this.cdr.markForCheck();
  }
 
  override _getLevel(nodeData: T): number | undefined {
    if (this.treeControl?.getLevel) {
      return this.treeControl.getLevel(nodeData);
    }
    return;
  }

  private createNode(nodeData: T, index: number): DxTreeVirtualNodeData<T> {
    const node = this._getNodeDef(nodeData, index);
    const context = new CdkTreeNodeOutletContext<T>(nodeData);
    if (this.treeControl?.getLevel) {
      context.level = this.treeControl.getLevel(nodeData);
    } else {
      context.level = 0;
    }
    return {
      data: nodeData,
      context,
      nodeDef: node
    };
  }
}