---
category: Components
type: Data Display
title: Tiles
---

A set of dashboard tile primitives and variants: generic wrapper / header / footer that accept projected content, plus ready-made monitoring and KPI tiles. Exposed together through `TilesModule`.

## When To Use

- When building dashboards that mix summary tiles (monitoring stats, KPIs, charts).
- When you want a consistent tile chrome (header + content + footer) with projected body content.
- When KPI tiles should fetch their own data via a `serviceApi` URL and render a line / bar / pie chart.
- When a monitoring tile needs a header with title / subtitle and a footer with count and icon.

## API

```html
<dx-tile-wrapper [header]="{ title: 'Sales', subtitle: 'Last 30 days' }">
  <dx-tiles-header [header]="{ title: 'Sales', subtitle: 'Last 30 days' }"></dx-tiles-header>
  <div class="body">
    <!-- projected content -->
  </div>
  <dx-tiles-footer [footer]="{ title: 'Updated just now' }"></dx-tiles-footer>
</dx-tile-wrapper>
```

### Sub-components

| Selector | Component | Description |
|----------|-----------|-------------|
| `dx-tile-wrapper` | `DxTileWrapperComponent` | Outer tile container with optional header |
| `dx-tiles-header` | `DxTilesHeaderComponent` | Generic tile header (icon / title / subtitle) |
| `dx-tiles-footer` | `DxTileFooterComponent` | Generic tile footer (title) |
| `dx-monitoring-tile` | `MonitoringTileComponent` | Pre-built monitoring tile with header, content slot, and footer |
| `dx-tile-header` | `TileHeaderComponent` | Header used by `dx-monitoring-tile` |
| `dx-tile-footer` | `TileFooterComponent` | Footer used by `dx-monitoring-tile` |
| `dx-kpi-tile` | `KpiTileComponent` | Self-fetching KPI tile that renders a chart |

### dx-monitoring-tile

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[data]` | Monitoring tile configuration | `MonitoringTileDto` | - |

### dx-kpi-tile

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[tileData]` | KPI tile configuration (header, `serviceApi`, footer) | `KPI` | - |

### dx-tile-wrapper

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[header]` | Header data | `TileHeaderDto` | - |

### dx-tiles-header / dx-tile-header

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[header]` | Header data | `TileHeaderDto` / `MHeader` | - |
| `[isContentHeightSmall]` | Compact layout flag used by the monitoring tile | `boolean` | `false` |

### dx-tiles-footer / dx-tile-footer

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[footer]` | Footer data | `TileFooterDto` / `MFooter` | - |
| `[isContentHeightSmall]` | Compact layout flag used by the monitoring tile | `boolean` | `false` |

### Types

```typescript
interface TileHeaderDto { icon?: string; title?: string; subtitle?: string }
interface TileFooterDto { title?: string }

interface MHeader  { title?: string; titleClr?: string; subTitle?: string; subTitleClr?: string; oneLineTitle?: string }
interface MFooter  { icon?: string; iconClr?: string; count?: number; countClr?: string; description?: string }
interface MonitoringTileDto { header?: MHeader; footer?: MFooter }

interface KPI {
  header?: TileHeaderDto;
  serviceApi?: string;
  footer?: TileFooterDto;
}

interface KpiDto {
  value?: string;
  icon?: string;
  unit?: string;
  color?: string;
  title?: string;
  chartType?: 'liner' | 'bar' | 'pie' | string;
  chartData?: LineChart[];
}
```

## Examples

### Monitoring tile

```typescript
tile: MonitoringTileDto = {
  header: { title: 'Active users', subTitle: 'Last 24h' },
  footer: { icon: 'trending_up', count: 12, description: 'vs yesterday' }
};
```

```html
<dx-monitoring-tile [data]="tile"></dx-monitoring-tile>
```

### KPI tile with chart

```typescript
kpi: KPI = {
  header: { title: 'Revenue', subtitle: 'This week' },
  serviceApi: '/api/kpi/revenue',
  footer: { title: 'Updated a minute ago' }
};
```

```html
<dx-kpi-tile [tileData]="kpi"></dx-kpi-tile>
```

### Custom tile via wrapper

```html
<dx-tile-wrapper [header]="{ title: 'Tasks' }">
  <dx-tiles-header [header]="{ title: 'Tasks', subtitle: 'Today' }"></dx-tiles-header>
  <ul class="task-list">
    <li *ngFor="let t of tasks">{{ t.name }}</li>
  </ul>
  <dx-tiles-footer [footer]="{ title: 'View all tasks' }"></dx-tiles-footer>
</dx-tile-wrapper>
```

## Import

```typescript
import { TilesModule } from '@ngdx/dijta';

@NgModule({
  imports: [TilesModule]
})
export class YourModule { }
```
