
import { CdkTree } from '@angular/cdk/tree';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';


import { DxTreeNodeOutletDirective } from './outlet';
import { DxTreeView } from './tree';
import { treeCollapseMotion } from '../../animation/collapse';

@Component({
  selector: 'dx-tree-view',
  exportAs: 'dxTreeView',
  template: `
    <div class="dx-tree-list-holder">
      <div
        [@.disabled]="!_afterViewInit || !!noAnimation?.dxNoAnimation"
        [@treeCollapseMotion]="_nodeOutlet.viewContainer.length"
        class="dx-tree-list-holder-inner"
      >
        <ng-container dxTreeNodeOutlet></ng-container>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: CdkTree, useExisting: forwardRef(() => DxTreeViewComponent) },
    { provide: DxTreeView, useExisting: forwardRef(() => DxTreeViewComponent) }
  ],
  host: {
    class: 'dx-tree',
    '[class.dx-tree-block-node]': 'dxDirectoryTree || dxBlockNode',
    '[class.dx-tree-directory]': 'dxDirectoryTree',
    '[class.dx-tree-rtl]': `dir === 'rtl'`
  },
  animations: [treeCollapseMotion]
})
export class DxTreeViewComponent<T> extends DxTreeView<T> implements AfterViewInit {
  @ViewChild(DxTreeNodeOutletDirective, { static: true }) nodeOutlet!: DxTreeNodeOutletDirective;
  _afterViewInit = false;

  override ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this._afterViewInit = true;
      this.cdr.markForCheck();
    });
  }
}