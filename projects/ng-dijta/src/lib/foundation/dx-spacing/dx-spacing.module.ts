import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DxSpacingComponent } from './dx-spacing.component';

@NgModule({
  declarations: [DxSpacingComponent],
  imports: [CommonModule, MatIconModule],
  exports: [DxSpacingComponent],
})
export class DxSpacingModule {}
