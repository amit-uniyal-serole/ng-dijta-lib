import { Directive, TemplateRef } from '@angular/core';
import { DxSafeAny } from '../../core/outlet/type/any';

@Directive({
    selector: '[dxDrawerContent]',
    exportAs: 'dxDrawerContent'
})
export class DxDrawerContentDirective {
    constructor(public templateRef: TemplateRef<DxSafeAny>) { }
}