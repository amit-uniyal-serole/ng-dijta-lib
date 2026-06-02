import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DxZIndexComponent } from './dx-z-index.component';

@NgModule({
  declarations: [DxZIndexComponent],
  imports: [CommonModule, MatIconModule],
  exports: [DxZIndexComponent],
})
export class DxZIndexModule {}
