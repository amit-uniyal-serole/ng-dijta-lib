import { Directive, ElementRef, HostListener, Renderer2, AfterViewInit, OnInit } from '@angular/core';

@Directive({
    selector: '[scrollHeight]'
})
export class ScrollHeightDirective implements AfterViewInit, OnInit {
    constructor(private el: ElementRef, private renderer: Renderer2) { }
    ngOnInit(): void {
        this.calculateViewportHeight();
        setTimeout(() => {
            this.calculateViewportHeight();
        }, 2000);
    }
    ngAfterViewInit(): void {
        this.calculateViewportHeight();
    }

    @HostListener('window:resize')
    onResize() {
        this.calculateViewportHeight();
    }

    private calculateViewportHeight(): void {
        const element = this.el.nativeElement;
        const rect = element.getBoundingClientRect();
        const distanceFromTop = rect.top + window.scrollY;
        const viewportHeight = window.innerHeight;
        const sidebarHeight = viewportHeight - distanceFromTop;

        this.renderer.setStyle(element, 'height', sidebarHeight + 'px');
    }
}
