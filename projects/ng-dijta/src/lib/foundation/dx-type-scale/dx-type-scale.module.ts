import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DxTypeScaleComponent } from './dx-type-scale.component';

@NgModule({
  declarations: [DxTypeScaleComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  exports: [DxTypeScaleComponent],
})
export class DxTypeScaleModule {}
