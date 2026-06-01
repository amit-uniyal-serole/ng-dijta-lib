import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { booleanAttribute, Directive, forwardRef, Input } from '@angular/core';

@Directive({
  selector: 'dx-tree-node-toggle[dxTreeNodeNoopToggle], [dxTreeNodeNoopToggle]',
  host: {
    class: 'dx-tree-switcher dx-tree-switcher-noop'
  }
})
export class DxTreeNodeNoopToggleDirective {}

@Directive({
  selector: 'dx-tree-node-toggle:not([dxTreeNodeNoopToggle]), [dxTreeNodeToggle]',
  providers: [{ provide: CdkTreeNodeToggle, useExisting: forwardRef(() => DxTreeNodeToggleDirective) }],
  host: {
    class: 'dx-tree-switcher',
    '[class.dx-tree-switcher_open]': 'isExpanded',
    '[class.dx-tree-switcher_close]': '!isExpanded'
  }
})
export class DxTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {
  @Input({ alias: 'dxTreeNodeToggleRecursive', transform: booleanAttribute }) override recursive = false;

  get isExpanded(): boolean {
    return this._treeNode.isExpanded;
  }
}

@Directive({
  selector: '[dxTreeNodeToggleRotateIcon]',
  host: {
    class: 'dx-tree-switcher-icon'
  }
})
export class DxTreeNodeToggleRotateIconDirective {}

@Directive({
  selector: '[dxTreeNodeToggleActiveIcon]',
  host: {
    class: 'dx-tree-switcher-loading-icon'
  }
})
export class DxTreeNodeToggleActiveIconDirective {}