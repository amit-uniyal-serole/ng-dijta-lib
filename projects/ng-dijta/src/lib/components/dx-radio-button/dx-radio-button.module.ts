import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxRadioButtonComponent } from './dx-radio-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';
import { AbilityModule } from '@casl/angular';
@NgModule({
  declarations: [DxRadioButtonComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatRadioModule, ReactiveFormsModule, TranslocoModule, AbilityModule],
  exports: [DxRadioButtonComponent],
})
export class DxRadioButtonModule { }
