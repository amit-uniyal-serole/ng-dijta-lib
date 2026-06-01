import { EChartsOption } from 'echarts';
import { chartStyles } from '../dx-chart-tile/chart.model';

export interface tile {
  titleTt?: string;
  applicationIcon?: string;
  descriptionTt?: string;
  footerTt?: string;
  footerValue?: number;
  openNewTabFg?: boolean;
  tileSize?: string;
  type?: string;
  options?: EChartsOption;
  chartStyles?: chartStyles;
}
