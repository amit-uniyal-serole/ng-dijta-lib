import { CdkTreeNode, CdkTreeNodeDef, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  EmbeddedViewRef,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';

import { DxTreeNodeIndentsComponent } from './indent';
import { DxNodeBase } from './node-base';
import { DxTreeNodeNoopToggleDirective } from './toggle';
import { DxSafeAny } from '../../core';

export interface DxTreeVirtualNodeData<T> {
  data: T;
  context: CdkTreeNodeOutletContext<T>;
  nodeDef: CdkTreeNodeDef<T>;
}

@Component({
  selector: 'dx-tree-node:not([builtin])',
  exportAs: 'dxTreeNode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CdkTreeNode,
      useExisting: forwardRef(() => DxTreeNodeComponent)
    },
    {
      provide: DxNodeBase,
      useExisting: forwardRef(() => DxTreeNodeComponent)
    }
  ],
  template: `
    @if (indents.length) {
      <dx-tree-node-indents [indents]="indents"></dx-tree-node-indents>
    }
    <ng-content select="dx-tree-node-toggle, [dx-tree-node-toggle]"></ng-content>
    @if (indents.length && isLeaf) {
      <dx-tree-node-toggle class="dx-tree-leaf-line-icon" dxTreeNodeNoopToggle>
        <span class="dx-tree-switcher-leaf-line"></span>
      </dx-tree-node-toggle>
    }
    <ng-content select="dx-tree-node-checkbox"></ng-content>
    <ng-content select="dx-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `,
  host: {
    class: 'dx-tree-treenode',
    '[class.dx-tree-treenode-switcher-open]': 'isExpanded',
    '[class.dx-tree-treenode-switcher-close]': '!isExpanded',
    '[class.dx-tree-treenode-selected]': 'selected',
    '[class.dx-tree-treenode-disabled]': 'disabled'
  },
})
export class DxTreeNodeComponent<T> extends DxNodeBase<T> implements OnInit {
  indents: boolean[] = [];
  disabled = false;
  selected = false;
  isLeaf = false;

  private cdr = inject(ChangeDetectorRef);

  override ngOnInit(): void {
    super.ngOnInit();
    this.isLeaf = !this._tree.treeControl?.isExpandable(this.data);
  }

  disable(): void {
    this.disabled = true;
  }

  enable(): void {
    this.disabled = false;
  }

  select(): void {
    this.selected = true;
  }

  deselect(): void {
    this.selected = false;
  }

  setIndents(indents: boolean[]): void {
    this.indents = indents;
    this.cdr.markForCheck();
  }
}

@Directive({
  selector: '[dxTreeNodeDef]',
  providers: [
    {
      provide: CdkTreeNodeDef,
      useExisting: forwardRef(() => DxTreeNodeDefDirective)
    }
  ]
})
export class DxTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {
  @Input('dxTreeNodeDefWhen') override when: (index: number, nodeData: T) => boolean = null!;
}

@Directive({
  selector: '[dxTreeVirtualScrollNodeOutlet]'
})
export class DxTreeVirtualScrollNodeOutletDirective<T> implements OnChanges {
  private _viewRef: EmbeddedViewRef<DxSafeAny> | null = null;
  private _viewContainerRef = inject(ViewContainerRef);
  @Input() data!: DxTreeVirtualNodeData<T>;
  @Input() compareBy?: ((value: T) => T | string | number) | null;

  ngOnChanges(changes: SimpleChanges): void {
    const recreateView = this.shouldRecreateView(changes);
    if (recreateView) {
      const viewContainerRef = this._viewContainerRef;

      if (this._viewRef) {
        viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
      }

      this._viewRef = this.data
        ? viewContainerRef.createEmbeddedView(this.data.nodeDef.template, this.data.context)
        : null;

      if (CdkTreeNode.mostRecentTreeNode && this._viewRef) {
        CdkTreeNode.mostRecentTreeNode.data = this.data.data;
      }
    } else if (this._viewRef && this.data.context) {
      this.updateExistingContext(this.data.context);
    }
  }

  private shouldRecreateView(changes: SimpleChanges): boolean {
    const ctxChange = changes.data;
    return ctxChange && this.hasContextShapeChanged(ctxChange);
  }

  private hasContextShapeChanged(ctxChange: SimpleChange): boolean {
    const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
    const currCtxKeys = Object.keys(ctxChange.currentValue || {});

    if (prevCtxKeys.length === currCtxKeys.length) {
      for (const propName of currCtxKeys) {
        if (prevCtxKeys.indexOf(propName) === -1) {
          return true;
        }
      }
      return (
        this.innerCompareBy(ctxChange.previousValue?.data ?? null) !==
        this.innerCompareBy(ctxChange.currentValue?.data ?? null)
      );
    }
    return true;
  }

  get innerCompareBy(): (value: T | null) => T | string | number | null {
    return value => {
      if (value === null) return value;
      if (this.compareBy) return this.compareBy(value as T);
      return value;
    };
  }

  private updateExistingContext(ctx: DxSafeAny): void {
    for (const propName of Object.keys(ctx)) {
      this._viewRef!.context[propName] = (this.data.context as DxSafeAny)[propName];
    }
  }
}