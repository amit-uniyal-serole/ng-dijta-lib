import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxTitleComponent } from './dx-title.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@jsverse/transloco';
@NgModule({
  declarations: [DxTitleComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule, TranslocoModule],
  exports: [DxTitleComponent],
})
export class DxTitleModule { }
