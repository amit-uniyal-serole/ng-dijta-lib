
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { DxTreeNodeComponent } from './node';
import { fromEventOutsideAngular } from '../../utils';

@Component({
  selector: 'dx-tree-node-option',
  template: `<span class="dx-tree-title"><ng-content></ng-content></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dx-tree-node-content-wrapper',
    '[class.dx-tree-node-content-wrapper-open]': 'isExpanded',
    '[class.dx-tree-node-selected]': 'dxSelected'
  }
})
export class DxTreeNodeOptionComponent<T> implements OnChanges, OnInit {
  private ngZone = inject(NgZone);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private destroyRef = inject(DestroyRef);
  private treeNode = inject(DxTreeNodeComponent<T>);

  @Input({ transform: booleanAttribute }) dxSelected = false;
  @Input({ transform: booleanAttribute }) dxDisabled = false;
  @Output() readonly dxClick = new EventEmitter<MouseEvent>();

  get isExpanded(): boolean {
    return this.treeNode.isExpanded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { dxDisabled, dxSelected } = changes;
    if (dxDisabled) {
      if (dxDisabled.currentValue) {
        this.treeNode.disable();
      } else {
        this.treeNode.enable();
      }
    }

    if (dxSelected) {
      if (dxSelected.currentValue) {
        this.treeNode.select();
      } else {
        this.treeNode.deselect();
      }
    }
  }

  ngOnInit(): void {
    fromEventOutsideAngular<MouseEvent>(this.el, 'click')
      .pipe(
        filter(() => !this.dxDisabled && this.dxClick.observers.length > 0),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        this.ngZone.run(() => this.dxClick.emit(event));
      });
  }
}