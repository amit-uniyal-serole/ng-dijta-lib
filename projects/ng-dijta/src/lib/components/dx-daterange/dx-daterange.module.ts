import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { DxDaterangeComponent } from './dx-daterange.component';
import { DxDirectiveModule } from '../../directive/directive.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
@NgModule({
  declarations: [DxDaterangeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DxDirectiveModule,
    MatMomentDateModule
  ],
  exports: [DxDaterangeComponent],
})
export class DxDaterangeModule { }
