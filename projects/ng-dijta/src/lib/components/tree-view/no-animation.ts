import { Directive, Input, booleanAttribute, inject } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

@Directive({
  selector: '[dxNoAnimation]',
  exportAs: 'dxNoAnimation',
  host: {
    '[class.dx-animate-disabled]': `dxNoAnimation || animationType === 'NoopAnimations'`
  }
})
export class DxNoAnimationDirective {
  animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });
  @Input({ transform: booleanAttribute }) dxNoAnimation: boolean = false;
}