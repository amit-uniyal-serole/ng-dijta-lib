import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxInputDatePickerComponent } from './dx-input-datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslocoModule } from '@jsverse/transloco';
@NgModule({
  declarations: [DxInputDatePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    TranslocoModule
  ],
  exports: [DxInputDatePickerComponent],
})
export class DxInputDatePickerModule { }
