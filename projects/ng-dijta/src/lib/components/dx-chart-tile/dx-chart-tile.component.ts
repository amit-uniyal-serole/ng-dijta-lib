import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { chartStyles } from './chart.model';
@Component({
  selector: 'dx-chart-tile',
  templateUrl: './dx-chart-tile.component.html',
  styleUrls: ['./dx-chart-tile.component.scss'],
})
export class DxChartTileComponent {
  @Input() chartOptions!: EChartsOption;
  @Input() styles!: chartStyles;
}
