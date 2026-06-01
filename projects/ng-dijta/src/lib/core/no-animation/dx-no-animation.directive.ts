import { BooleanInput, coerceElement } from '@angular/cdk/coercion';
import { AfterViewInit, Directive, ElementRef, Inject, Input, OnChanges, Optional, Renderer2 } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { InputBoolean } from '../../utils/types/tick';


const DISABLED_CLASSNAME = 'nz-animate-disabled';

@Directive({
  selector: '[dxNoAnimation]',
  exportAs: 'dxNoAnimation'
})
export class DxNoAnimationDirective implements OnChanges, AfterViewInit {
  static ngAcceptInputType_dxNoAnimation: BooleanInput;

  @Input() @InputBoolean() dxNoAnimation: boolean = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationType: string
  ) { }

  ngOnChanges(): void {
    this.updateClass();
  }

  ngAfterViewInit(): void {
    this.updateClass();
  }

  private updateClass(): void {
    const element = coerceElement(this.element);
    if (!element) {
      return;
    }
    if (this.dxNoAnimation || this.animationType === 'NoopAnimations') {
      this.renderer.addClass(element, DISABLED_CLASSNAME);
    } else {
      this.renderer.removeClass(element, DISABLED_CLASSNAME);
    }
  }
}
