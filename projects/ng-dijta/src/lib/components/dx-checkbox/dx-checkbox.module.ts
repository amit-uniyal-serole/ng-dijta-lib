import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DxCheckboxComponent } from './dx-checkbox.component';
import { TranslocoModule } from '@jsverse/transloco';

@NgModule({
  declarations: [DxCheckboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [DxCheckboxComponent]
})
export class DxCheckboxModule { }
