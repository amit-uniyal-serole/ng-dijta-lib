
import { AfterViewInit, Directive, DoCheck, ElementRef, HostListener, Input, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';

const DRAG_OVER_CLASS = 'is-dragging-over';

@Directive({
  selector: '[treeDrag]'
})
export class TreeDragDirective implements AfterViewInit, DoCheck, OnDestroy {
  @Input('treeDrag') draggedElement!: any;
  @Input() treeDragEnabled!: any;
  private readonly dragEventHandler: (ev: DragEvent) => void;

  constructor(private el: ElementRef, private renderer: Renderer2, private treeDraggedElement: TreeDraggedElement, private ngZone: NgZone) {
    this.dragEventHandler = this.onDrag.bind(this);
  }

  ngAfterViewInit(): void {
    let el: HTMLElement = this.el.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      el.addEventListener('drag', this.dragEventHandler);
    });
  }

  ngDoCheck(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? 'true' : 'false');
  }

  ngOnDestroy(): void {
    let el: HTMLElement = this.el.nativeElement;
    el.removeEventListener('drag', this.dragEventHandler);
  }

  @HostListener('dragstart', ['$event']) onDragStart(ev: any) {
    // setting the data is required by firefox
    ev?.dataTransfer?.setData('text', ev?.target?.id);
    this.treeDraggedElement?.set(this.draggedElement);
    if (this.draggedElement?.mouseAction) {
      this.draggedElement?.mouseAction('dragStart', ev);
    }
  }

  onDrag(ev: any): void {
    if (this.draggedElement?.mouseAction) {
      this.draggedElement?.mouseAction('drag', ev);
    }
  }

  @HostListener('dragend') onDragEnd(): void {
    if (this.draggedElement?.mouseAction) {
      this.draggedElement?.mouseAction('dragEnd');
    }
    this.treeDraggedElement?.set(null);
  }
}
