import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxInputEmailComponent } from './dx-input-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from '../../core/UI/core/input-mask/input-mask.module';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [DxInputEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InputMaskModule,
    MatTooltipModule
  ],
  exports: [DxInputEmailComponent],
})
export class DxInputEmailModule { }
