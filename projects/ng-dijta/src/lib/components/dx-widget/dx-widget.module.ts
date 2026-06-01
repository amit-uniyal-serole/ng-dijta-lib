import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxListWidgetComponent } from './variant/dx-list-widget/dx-list-widget.component';
import { DxTimelineModule } from '../dx-timeline';
import { TranslocoModule } from '@jsverse/transloco';

@NgModule({
  declarations: [
    DxListWidgetComponent
  ],
  imports: [
    CommonModule,
    DxTimelineModule,
    TranslocoModule
  ],
  exports: [
    DxListWidgetComponent
  ]
})
export class DxWidgetModule { }
