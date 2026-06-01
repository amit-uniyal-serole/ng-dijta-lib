import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InputMaskModule } from '../../core/UI/core/input-mask/input-mask.module';
import { DxDirectiveModule } from '../../directive';
import { DxCurrencyModule } from '../dx-currency';
import { DxNumberComponent } from './dx-number.component';
import { NumberInputDirective } from './dx-number.directive';
@NgModule({
  declarations: [DxNumberComponent, NumberInputDirective],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InputMaskModule,
    DxCurrencyModule,
    MatTooltipModule,
    DxDirectiveModule,
  ],
  exports: [DxNumberComponent, NumberInputDirective],
})
export class DxNumberModule { }
