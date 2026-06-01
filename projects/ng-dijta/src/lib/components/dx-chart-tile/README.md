---
category: Components
type: Data Display
title: Chart Tile
---

A sized chart tile that renders an ECharts visualization inside a fixed-dimension container. Wraps `ngx-echarts` and accepts explicit height/width styles.

## When To Use

- When you need to drop a chart into a tile or dashboard cell with a known size.
- When you want a simple `EChartsOption` + sizing API without writing a host container.
- Prefer over `dx-chart` when the tile size is fixed by layout and `ngx-echarts` is already a dependency.

## API

```html
<dx-chart-tile
  [chartOptions]="options"
  [styles]="{ height: '240px', width: '100%' }">
</dx-chart-tile>
```

### dx-chart-tile

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[chartOptions]` | ECharts option object describing the chart | `EChartsOption` | `-` |
| `[styles]` | Height / width applied to the chart container | `chartStyles` | `-` |

### Types

```typescript
export interface chartStyles {
  height: string;
  width: string;
}
```

## Examples

### Donut tile

```typescript
donutOptions: EChartsOption = {
  series: [{
    type: 'pie',
    radius: ['50%', '70%'],
    data: [
      { value: 60, name: 'Active' },
      { value: 40, name: 'Pending' }
    ]
  }]
};

tileStyles: chartStyles = { height: '220px', width: '100%' };
```

```html
<dx-chart-tile [chartOptions]="donutOptions" [styles]="tileStyles"></dx-chart-tile>
```

### Fixed-size bar tile

```html
<dx-chart-tile
  [chartOptions]="barOptions"
  [styles]="{ height: '180px', width: '320px' }">
</dx-chart-tile>
```

## Import

```typescript
import { DxChartTileModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxChartTileModule]
})
export class YourModule { }
```
