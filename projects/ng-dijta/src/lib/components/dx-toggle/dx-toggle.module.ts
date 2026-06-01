import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxToggleComponent } from './dx-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    DxToggleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslocoModule
  ],
  exports: [DxToggleComponent]
})
export class DxToggleModule { }
