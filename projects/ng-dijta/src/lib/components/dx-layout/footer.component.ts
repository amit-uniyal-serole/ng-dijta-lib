import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dx-layout-footer',
    exportAs: 'dxLayoutFooter',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <ng-content></ng-content> `
})
export class DxLayoutFooterComponent {
    constructor(public elementRef: ElementRef, private renderer: Renderer2) {
        this.renderer.addClass(this.elementRef.nativeElement, 'dx-layout-footer');
    }
}