import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DxStringTemplateOutletDirective } from './string_template_outlet.directive';

@NgModule({
    imports: [CommonModule],
    exports: [DxStringTemplateOutletDirective],
    declarations: [DxStringTemplateOutletDirective]
})
export class DxOutletModule { }