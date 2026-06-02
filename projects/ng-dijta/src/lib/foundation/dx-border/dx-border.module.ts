import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DxBorderComponent } from './dx-border.component';

@NgModule({
  declarations: [DxBorderComponent],
  imports: [CommonModule, MatIconModule],
  exports: [DxBorderComponent],
})
export class DxBorderModule {}
