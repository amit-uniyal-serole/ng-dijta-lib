import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxIpComponent } from './dx-ip.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DxIpComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [DxIpComponent],
})
export class DxIpModule { }
