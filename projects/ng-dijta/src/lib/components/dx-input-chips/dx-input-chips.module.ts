import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxInputChipsComponent } from './dx-input-chips.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { TranslocoModule } from '@ngneat/transloco';
@NgModule({
  declarations: [DxInputChipsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    TranslocoModule
  ],
  exports: [DxInputChipsComponent],
})
export class DxInputChipsModule { }
