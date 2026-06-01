import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxContentComponent } from './dx-content.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [DxContentComponent],
  imports: [CommonModule, MatTooltipModule, TranslocoModule],
  exports: [DxContentComponent],
})
export class DxContentModule { }
