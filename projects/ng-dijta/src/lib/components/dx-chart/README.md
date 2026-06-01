---
category: Components
type: Data Display
title: Chart
---

A low-level chart host that renders an [Apache ECharts](https://echarts.apache.org/) instance from an `EChartsOption` configuration and auto-resizes with its container.

## When To Use

- When you need to embed an ECharts visualization (line, bar, pie, etc.) directly via an `EChartsOption` config.
- When your chart must resize with its parent element or the window.
- When you want click-through interaction on chart elements via a single output.
- For higher-level presets with title/legend styling, prefer `dx-chart-tile`.

## API

```html
<dx-chart [chartData]="options" (chartClicked)="onClick($event)"></dx-chart>
```

### dx-chart

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[chartData]` | ECharts option object describing the chart | `EChartsOption` | `-` |
| `[chartParentId]` | DOM `id` of a parent element to observe for resize | `string` | `-` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(chartClicked)` | Emitted when the user clicks a chart series element; payload is the ECharts click params | `EventEmitter<EChartsOption>` |

## Examples

### Line chart

```typescript
lineOptions: EChartsOption = {
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [120, 200, 150, 80, 70] }]
};
```

```html
<dx-chart [chartData]="lineOptions"></dx-chart>
```

### Pie chart with click handling

```html
<dx-chart
  [chartData]="pieOptions"
  (chartClicked)="onSliceClick($event)">
</dx-chart>
```

### Observing a custom parent for resize

```html
<div id="chart-container" class="chart-wrapper">
  <dx-chart [chartData]="barOptions" chartParentId="chart-container"></dx-chart>
</div>
```

## Import

```typescript
import { DxChartModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxChartModule]
})
export class YourModule { }
```
