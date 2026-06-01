import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSectionTitleComponent } from './dx-section-title.component';
import { DxButtonModule } from '../dx-button';
import { TranslocoModule } from '@jsverse/transloco';

@NgModule({
  declarations: [DxSectionTitleComponent],
  imports: [
    CommonModule,
    DxButtonModule,
    TranslocoModule
  ],
  exports: [DxSectionTitleComponent]
})
export class DxSectionTitleModule { }
