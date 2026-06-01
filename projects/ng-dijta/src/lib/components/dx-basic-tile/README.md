---
category: Components
type: Data Display
title: Basic Tile
---

A lightweight dashboard tile that renders a title, description, icon, and footer summary in a click-through card layout.

## When To Use

- Building dashboard / landing-page grids where each tile links to a feature.
- Displaying a KPI card with a short description and a count in the footer.
- Grouping navigation cards with consistent chrome and tooltip behavior.

## API

```html
<dx-basic-tile
  [tile]="tileData"
  (tileClick)="onOpen($event)">
</dx-basic-tile>
```

### dx-basic-tile

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[tile]` | Tile content and configuration | `tile` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(tileClick)` | Emitted when the tile is clicked | `EventEmitter<tile>` |

### Types

```typescript
interface tile {
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
```

## Examples

### Basic navigation tile

```typescript
tileData: tile = {
  titleTt: 'Customers',
  applicationIcon: 'people',
  descriptionTt: 'Manage active customer accounts',
  footerTt: 'Total',
  footerValue: 128,
};
```

```html
<dx-basic-tile
  [tile]="tileData"
  (tileClick)="router.navigate(['/customers'])">
</dx-basic-tile>
```

### Opens in a new tab

```html
<dx-basic-tile
  [tile]="{ titleTt: 'Docs', applicationIcon: 'menu_book', descriptionTt: 'Product documentation', openNewTabFg: true }"
  (tileClick)="openDocs()">
</dx-basic-tile>
```

## Import

```typescript
import { DxBasicTileModule } from '@ngdx/dijta';

@NgModule({ imports: [DxBasicTileModule] })
export class YourModule { }
```
