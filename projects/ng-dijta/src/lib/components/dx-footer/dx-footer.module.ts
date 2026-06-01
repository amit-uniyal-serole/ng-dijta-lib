import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxFooterComponent } from './dx-footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
@NgModule({
  declarations: [DxFooterComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule, TranslocoModule],
  exports: [DxFooterComponent],
})
export class DxFooterModule { }
