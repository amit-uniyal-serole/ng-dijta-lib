import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DxShadowComponent } from './dx-shadow.component';

@NgModule({
  declarations: [DxShadowComponent],
  imports: [CommonModule, MatIconModule],
  exports: [DxShadowComponent],
})
export class DxShadowModule {}
