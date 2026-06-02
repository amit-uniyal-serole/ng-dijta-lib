import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DxBorderRadiusComponent } from './dx-border-radius.component';

@NgModule({
  declarations: [DxBorderRadiusComponent],
  imports: [CommonModule, MatIconModule],
  exports: [DxBorderRadiusComponent],
})
export class DxBorderRadiusModule {}
