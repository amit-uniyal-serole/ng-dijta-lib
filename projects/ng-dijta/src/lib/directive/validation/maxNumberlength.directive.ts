import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[maxNumberlength]'
})
export class MaxNumberLengthDirective {
    @Input('maxNumberlength') maxLength!: number;

    constructor(private el: ElementRef) { }

    @HostListener('input')
    onInput() {
        if (this.el.nativeElement.value) {
            const value = this.el.nativeElement.value;
            const length = (this.el.nativeElement.value as string).replace(/[^0-9.,]/g, "").length;
            if (length > this.maxLength) {
                this.el.nativeElement.value = value.substr(0, this.maxLength);
            }
        }

    }
}
