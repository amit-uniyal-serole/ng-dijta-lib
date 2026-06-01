import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[dAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {

  @Input('dAutoFocus') autoFocus: boolean | undefined;

  constructor(private  elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      setTimeout(() => {
        this.elementRef.nativeElement.focus();
      });
    }
  }
}
