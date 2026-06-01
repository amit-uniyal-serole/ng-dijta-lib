import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
// import { ModalService } from 'ng-dx/modal';
import { Subject } from 'rxjs';
import { DImagePreviewComponent } from './image-preview.component';
import { ModalService } from '../modal';
@Directive({
    selector: '[dImagePreview]',
})
export class ImagePreviewDirective implements OnInit, OnDestroy {

    constructor(
        private elementRef: ElementRef,
        private modalService: ModalService
    ) { }

    @Input() customSub: Subject<HTMLElement> | undefined;
    @Input() disableDefault = false;
    @Input() zIndex: number | undefined;
    @Input() backDropZIndex: number | undefined;

    @HostBinding('class.dx-image-preview-container')
    get defaultClasses() {
        return !this.disableDefault;
    }
    @HostListener('click', ['$event'])
    onClick($event) {
        if (this.disableDefault) {
            return;
        }
        const target = $event.target;
        if (target && target.nodeName.toLowerCase() === 'img') {
            this.imagePreView(target as HTMLElement);
        }
    }

    ngOnInit(): void {
        if (this.customSub) {
            this.customSub.subscribe((target) => {
                this.imagePreView(target);
            });
        }
    }

    ngOnDestroy(): void {
        if (this.customSub) {
            this.customSub.unsubscribe();
        }
    }

    imagePreView(imageHTMLElement: HTMLElement) {

        const modalRef = this.modalService.open({
            id: 'dx-image-preview-modal',
            component: DImagePreviewComponent,
            zIndex: this.zIndex,
            backDropZIndex: this.backDropZIndex,
            showAnimation: false,
            data: {
                targetImage: imageHTMLElement,
                images: Array.from(this.elementRef.nativeElement.querySelectorAll('img')),
                onClose: () => {
                    modalRef.modalInstance.hide();
                },
            },
        });
    }

}