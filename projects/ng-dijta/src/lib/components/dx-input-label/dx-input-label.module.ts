import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxInputLabelComponent } from './dx-input-label.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from '../../core/UI/core/input-mask/input-mask.module';
@NgModule({
  declarations: [DxInputLabelComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InputMaskModule
  ],
  exports: [DxInputLabelComponent],
})
export class DxInputLabelModule { }
