import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxInputDOBComponent } from './dx-input-dob.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [DxInputDOBComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  exports: [DxInputDOBComponent],
})
export class DxInputDOBModule { }
