import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxChartComponent } from './dx-chart.component';

@NgModule({
  declarations: [
    DxChartComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DxChartComponent
  ]
})
export class DxChartModule { }
