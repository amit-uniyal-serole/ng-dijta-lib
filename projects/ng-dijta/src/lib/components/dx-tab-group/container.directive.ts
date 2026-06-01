import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[content-container]'
})
export class ContainerDirective {
    constructor(public viewContainer: ViewContainerRef) { }
}