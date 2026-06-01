import { NgModule } from '@angular/core';

import { DxTreeNodeCheckboxComponent } from './checkbox';
import { DxTreeNodeIndentLineDirective, DxTreeNodeIndentsComponent } from './indent';
import { DxTreeNodeComponent, DxTreeNodeDefDirective, DxTreeVirtualScrollNodeOutletDirective } from './node';
import { DxTreeNodeOptionComponent } from './option';
import { DxTreeNodeOutletDirective } from './outlet';
import { DxTreeNodePaddingDirective } from './padding';
import {
  DxTreeNodeNoopToggleDirective,
  DxTreeNodeToggleActiveIconDirective,
  DxTreeNodeToggleDirective,
  DxTreeNodeToggleRotateIconDirective
} from './toggle';
import { DxTreeView } from './tree';
import { DxTreeViewComponent } from './tree-view';
import { DxTreeVirtualScrollViewComponent } from './tree-virtual-scroll-view';
import { DxNoAnimationModule } from '../../core/no-animation/dx-no-animation.module';
import { CdkVirtualForOf, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';

const treeWithControlComponents = [
  DxTreeView,
  DxTreeNodeOutletDirective,
  DxTreeViewComponent,
  DxTreeNodeDefDirective,
  DxTreeNodeComponent,
  DxTreeNodeToggleDirective,
  DxTreeNodePaddingDirective,
  DxTreeNodeToggleRotateIconDirective,
  DxTreeNodeToggleActiveIconDirective,
  DxTreeNodeOptionComponent,
  DxTreeNodeNoopToggleDirective,
  DxTreeNodeCheckboxComponent,
  DxTreeNodeIndentsComponent,
  DxTreeVirtualScrollViewComponent,
  DxTreeVirtualScrollNodeOutletDirective,
  DxTreeNodeIndentLineDirective,
  DxTreeVirtualScrollNodeOutletDirective,
    DxTreeNodeOutletDirective,
];

@NgModule({
  declarations: [treeWithControlComponents],
  imports: [DxNoAnimationModule,   CdkVirtualForOf,
      CdkVirtualScrollViewport,
      CdkFixedSizeVirtualScroll],
  exports: [treeWithControlComponents]
})
export class DxTreeViewModule {}