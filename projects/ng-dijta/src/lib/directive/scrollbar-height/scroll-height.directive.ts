import { Directive, ElementRef, HostListener, Renderer2, AfterViewInit, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[scrollHeight]'
})
export class ScrollHeightDirective implements AfterViewInit, OnInit {
    @Input() heightReduce: number | undefined;
    @Input() heightIncrease: number | undefined;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        // Set default height to 100vh
        this.renderer.setStyle(this.el.nativeElement, 'height', '100vh');
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

        if (this.heightIncrease) {
            this.renderer.setStyle(
                element,
                'height',
                sidebarHeight + (this.heightIncrease ?? 0) + 'px'
            );
        } else if (this.heightReduce) {
            this.renderer.setStyle(
                element,
                'height',
                sidebarHeight - (this.heightReduce ?? 0) + 'px'
            );
        } else {
            this.renderer.setStyle(element, 'height', sidebarHeight + 'px');
        }
    }
}
