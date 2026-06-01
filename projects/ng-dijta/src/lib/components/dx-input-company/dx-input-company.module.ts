import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxInputCompanyComponent } from './dx-input-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from '../../core/UI/core/input-mask/input-mask.module';
import { TranslocoModule } from '@jsverse/transloco';
@NgModule({
  declarations: [DxInputCompanyComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InputMaskModule,
    TranslocoModule
  ],
  exports: [DxInputCompanyComponent],
})
export class DxInputCompanyModule { }
