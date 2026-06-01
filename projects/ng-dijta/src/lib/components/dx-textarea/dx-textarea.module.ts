import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DxTextareaComponent } from './dx-textarea.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DxDirectiveModule } from '../../directive';

@NgModule({
  declarations: [DxTextareaComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    DxDirectiveModule
  ],
  exports: [DxTextareaComponent]
})
export class DxTextareaModule { }
