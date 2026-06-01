import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[dxTrimInput]'
})
export class TrimInputDirective {
 @Input('dxTrimInput') enableTrim = false; 
  constructor(private el: ElementRef) {}

  /**
   * Handles the blur event on the host element.
   * 
   * When the input loses focus, this method trims any leading or trailing whitespace
   * from the input's value. If the value was changed, it dispatches a new 'input' event
   * to ensure that Angular and other listeners are notified of the update.
   */
  @HostListener('blur') onBlur() {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    if (this.enableTrim) {
      if (value && typeof value === 'string') {
        input.value = value.trim();
        input.dispatchEvent(new Event('input'));
      }
    }

  }

}
