import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dx-layout-content',
    exportAs: 'dxLayoutContent',
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: ` <ng-content></ng-content> `
})
export class DxLayoutContentComponent {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.renderer.addClass(this.elementRef.nativeElement, 'dx-layout-content');
    }
}