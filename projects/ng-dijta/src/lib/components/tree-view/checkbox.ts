
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEventOutsideAngular } from '../../utils';

@Component({
  selector: 'dx-tree-node-checkbox:not([builtin])',
  template: `<span class="dx-tree-checkbox-inner"></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dx-tree-checkbox',
    '[class.dx-tree-checkbox-checked]': `dxChecked`,
    '[class.dx-tree-checkbox-indeterminate]': `dxIndeterminate`,
    '[class.dx-tree-checkbox-disabled]': `dxDisabled`
  }
})
export class DxTreeNodeCheckboxComponent implements OnInit {
  private ngZone = inject(NgZone);
  private ref = inject(ChangeDetectorRef);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private destroyRef = inject(DestroyRef);

  @Input({ transform: booleanAttribute }) dxChecked?: boolean;
  @Input({ transform: booleanAttribute }) dxIndeterminate?: boolean;
  @Input({ transform: booleanAttribute }) dxDisabled?: boolean;
  @Output() readonly dxClick = new EventEmitter<MouseEvent>();

  ngOnInit(): void {
    fromEventOutsideAngular<MouseEvent>(this.el, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (!this.dxDisabled && this.dxClick.observers.length) {
          this.ngZone.run(() => {
            this.dxClick.emit(event);
            this.ref.markForCheck();
          });
        }
      });
  }
}