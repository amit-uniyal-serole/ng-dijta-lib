import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxChartComponent } from './dx-chart.component';
import { DxChartModule } from './dx-chart.module';

const meta: Meta<any> = {
  title: 'Data Display/Chart',
  component: DxChartComponent,
  decorators: [
    moduleMetadata({
      imports: [DxChartModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Raw ECharts wrapper — initializes an `echarts.init` instance against the host ' +
          'element and resizes via a `ResizeObserver` on the parent (`[chartParentId]`) plus ' +
          'a debounced window-resize listener. Pass any `EChartsOption` shape through ' +
          '`[chartData]`. Use this when you need direct control over the ECharts instance; ' +
          'reach for `dx-chart-tile` when you want the tile-shaped container around it.',
      },
    },
  },
  argTypes: {
    chartData: { control: 'object', description: 'Full `EChartsOption` payload — see ECharts docs.' },
    chartParentId: { control: 'text', description: 'ID of the parent container the chart should observe for resize.' },
    chartClicked: { action: 'chartClicked', description: 'Fires with the ECharts click params when a series item is clicked.' },
  },
  args: {
    chartParentId: 'dx-chart-host',
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <div id="dx-chart-host" style="width:100%; height:320px; padding:16px; border:1px solid #e0e0e0; border-radius:8px; box-sizing:border-box;">
    <dx-chart [chartData]="chartData" [chartParentId]="chartParentId" (chartClicked)="chartClicked($event)"></dx-chart>
  </div>
`;

// ──────────────────────────────────────────────────────────────────────────
// Chart types
// ──────────────────────────────────────────────────────────────────────────

export const Line: Story = {
  parameters: { docs: { description: { story: 'Basic line chart — week-over-week metric.' } } },
  args: {
    chartData: {
      tooltip: { trigger: 'axis' },
      grid: { left: 40, right: 16, top: 24, bottom: 24 },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [{
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
        areaStyle: {},
        lineStyle: { width: 2 },
        itemStyle: { color: '#3498DB' },
      }],
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Bar: Story = {
  parameters: { docs: { description: { story: 'Vertical bar chart.' } } },
  args: {
    chartData: {
      tooltip: { trigger: 'axis' },
      grid: { left: 40, right: 16, top: 24, bottom: 24 },
      xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [420, 530, 640, 580], itemStyle: { color: '#16A085', borderRadius: [4, 4, 0, 0] } }],
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const StackedBar: Story = {
  name: 'Stacked bar',
  parameters: { docs: { description: { story: 'Multiple series stacked on the same axis.' } } },
  args: {
    chartData: {
      tooltip: { trigger: 'axis' },
      legend: { top: 0 },
      grid: { left: 40, right: 16, top: 36, bottom: 24 },
      xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Open',     type: 'bar', stack: 'total', data: [42, 38, 51, 60, 48, 55], itemStyle: { color: '#3498DB' } },
        { name: 'Resolved', type: 'bar', stack: 'total', data: [120, 132, 101, 134, 90, 110], itemStyle: { color: '#16A085' } },
        { name: 'Backlog',  type: 'bar', stack: 'total', data: [20, 15, 22, 18, 27, 16], itemStyle: { color: '#E67E22' } },
      ],
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Pie: Story = {
  parameters: { docs: { description: { story: 'Pie chart with vertical legend.' } } },
  args: {
    chartData: {
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 16, top: 'middle' },
      series: [{
        type: 'pie',
        radius: '70%',
        center: ['65%', '50%'],
        data: [
          { value: 1048, name: 'Search' },
          { value: 735,  name: 'Direct' },
          { value: 580,  name: 'Email' },
          { value: 484,  name: 'Affiliate' },
          { value: 300,  name: 'Video' },
        ],
        label: { show: true, formatter: '{b}: {d}%' },
      }],
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Donut: Story = {
  parameters: { docs: { description: { story: 'Pie with `radius:["45%","70%"]` for a donut look.' } } },
  args: {
    chartData: {
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [{
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
        labelLine: { show: false },
        data: [
          { value: 1048, name: 'Search',    itemStyle: { color: '#3498DB' } },
          { value: 735,  name: 'Direct',    itemStyle: { color: '#16A085' } },
          { value: 580,  name: 'Email',     itemStyle: { color: '#9B59B6' } },
          { value: 484,  name: 'Affiliate', itemStyle: { color: '#E67E22' } },
        ],
      }],
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Gauge: Story = {
  parameters: { docs: { description: { story: 'KPI gauge with center-formatted percent value.' } } },
  args: {
    chartData: {
      series: [{
        type: 'gauge',
        progress: { show: true, width: 14 },
        axisLine: { lineStyle: { width: 14 } },
        axisTick: { show: false },
        splitLine: { length: 12, lineStyle: { width: 2, color: '#999' } },
        axisLabel: { distance: 22, color: '#666', fontSize: 12 },
        anchor: { show: true, showAbove: true, size: 12, itemStyle: { borderWidth: 4 } },
        title: { show: false },
        detail: { valueAnimation: true, fontSize: 28, offsetCenter: [0, '70%'], formatter: '{value}%' },
        data: [{ value: 78 }],
      }],
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Scatter: Story = {
  parameters: { docs: { description: { story: 'Scatter plot.' } } },
  args: {
    chartData: {
      tooltip: {},
      grid: { left: 40, right: 16, top: 24, bottom: 24 },
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [{
        type: 'scatter',
        symbolSize: 14,
        data: [
          [10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81], [11.0, 8.33],
          [14.0, 7.66], [13.4, 6.81], [10.0, 6.33], [14.0, 8.96], [12.5, 6.82],
          [9.15, 7.20], [11.5, 7.20], [3.03, 4.23], [12.2, 7.83], [2.02, 4.47],
        ],
        itemStyle: { color: '#9B59B6' },
      }],
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Radar: Story = {
  parameters: { docs: { description: { story: 'Radar / spider chart comparing two series.' } } },
  args: {
    chartData: {
      tooltip: {},
      legend: { top: 0, data: ['Allocated', 'Actual'] },
      radar: {
        indicator: [
          { name: 'Sales',       max: 6500 },
          { name: 'Admin',       max: 16000 },
          { name: 'Information', max: 30000 },
          { name: 'Customer',    max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing',   max: 25000 },
        ],
      },
      series: [{
        type: 'radar',
        data: [
          { value: [4200, 3000, 20000, 35000, 50000, 18000], name: 'Allocated', areaStyle: { opacity: 0.2 } },
          { value: [5000, 14000, 28000, 26000, 42000, 21000], name: 'Actual',   areaStyle: { opacity: 0.2 } },
        ],
      }],
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

// ──────────────────────────────────────────────────────────────────────────
// Sizing
// ──────────────────────────────────────────────────────────────────────────

export const Compact: Story = {
  name: 'Compact (180px)',
  parameters: { docs: { description: { story: 'Shorter host — the chart picks up the parent\'s 180px via `ResizeObserver`.' } } },
  args: {
    chartData: {
      grid: { left: 24, right: 8, top: 8, bottom: 16 },
      xAxis: { type: 'category', data: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], axisLabel: { fontSize: 10 } },
      yAxis: { type: 'value', show: false },
      series: [{ type: 'bar', data: [40, 32, 51, 60, 48, 55, 28], itemStyle: { color: '#3498DB', borderRadius: [2, 2, 0, 0] } }],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div id="dx-chart-host" style="width:100%; height:180px; padding:16px; border:1px solid #e0e0e0; border-radius:8px; box-sizing:border-box;">
        <dx-chart [chartData]="chartData" [chartParentId]="chartParentId"></dx-chart>
      </div>
    `,
  }),
};

export const Empty: Story = {
  name: 'Empty data',
  parameters: { docs: { description: { story: 'Edge case — empty `chartData`. ECharts paints an empty grid.' } } },
  args: { chartData: {} },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};
