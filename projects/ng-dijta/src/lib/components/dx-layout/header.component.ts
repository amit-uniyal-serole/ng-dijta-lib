import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dx-layout-header',
    exportAs: 'dxLayoutHeader',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `
})
export class DxLayoutHeaderComponent {
    constructor(public elementRef: ElementRef, private renderer: Renderer2) {
        this.renderer.addClass(this.elementRef.nativeElement, 'dx-layout-header');
    }
}