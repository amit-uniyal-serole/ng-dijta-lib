import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from '../../core/UI/core/input-mask/input-mask.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DxInputUrlComponent } from './dx-input-url.component';
import { DxUrlValidatorDirective } from './dx-url-validator.directive';
@NgModule({
  declarations: [DxInputUrlComponent, DxUrlValidatorDirective],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InputMaskModule,
    MatTooltipModule,
  ],

  exports: [DxInputUrlComponent, DxUrlValidatorDirective],
})
export class DxInputUrlModule { }
