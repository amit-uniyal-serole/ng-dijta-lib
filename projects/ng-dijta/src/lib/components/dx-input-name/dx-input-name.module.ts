import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxInputNameComponent } from './dx-input-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from '../../core/UI/core/input-mask/input-mask.module';
@NgModule({
  declarations: [DxInputNameComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InputMaskModule
  ],
  exports: [DxInputNameComponent],
})
export class DxInputNameModule { }
