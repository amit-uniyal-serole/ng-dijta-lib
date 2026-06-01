import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDatetimePickerComponent } from './dx-datetime-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DxDirectiveModule } from '../../directive/directive.module';
import {   NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule } from '../../core/datetime-picker';
import { NgxMatMomentModule } from '../../core/moment-adapter';

@NgModule({
  declarations: [
    DxDatetimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    NgxMatTimepickerModule,
    DxDirectiveModule
  ],
  exports: [DxDatetimePickerComponent]
})
export class DxDatetimePickerModule { }
