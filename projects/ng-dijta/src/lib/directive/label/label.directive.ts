import { Directive, input } from '@angular/core';

@Directive({
    selector: 'dx-label,[dxLabel]',
    standalone: true
})
export class DxLabelDirective {}