import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxChartTileComponent } from './dx-chart-tile.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { Axis, ChartView } from 'echarts/index';
export function chartModule(): Promise<{
  Axis: typeof Axis;
  ChartView: typeof ChartView;
}> {
  return import('echarts');
}
@NgModule({
  declarations: [DxChartTileComponent],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: chartModule,
    }),
  ],
  exports: [DxChartTileComponent],
})
export class DxChartTileModule {}
