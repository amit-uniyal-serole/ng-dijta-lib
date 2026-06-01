import { NgModule } from '@angular/core';
import { InputMaskDirective } from './directive/input-mask.directive';
import { InputMaskPipe } from './pipe/input-mask.pipe';

@NgModule({
    declarations: [InputMaskDirective, InputMaskPipe],
    exports: [InputMaskDirective, InputMaskPipe]
})
export class InputMaskModule { }