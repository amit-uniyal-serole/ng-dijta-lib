import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxChartTileComponent } from './dx-chart-tile.component';
import { NgxEchartsModule } from 'ngx-echarts';

export function chartModule(): Promise<any> {
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
