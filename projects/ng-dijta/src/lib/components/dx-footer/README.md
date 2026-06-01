---
category: Components
type: Data Display
title: Footer
---

Tile footer that displays a label and optional value in the lower band of a dashboard tile. Designed to be used inside a `dx-basic-tile` or `dx-chart-tile`.

## When To Use

- When a tile needs a summary footer (e.g. *Total: 42*) below its main content.
- When several tiles in a dashboard share the same footer layout.
- Pair it with `dx-basic-tile` / `dx-chart-tile` for consistent tile styling.

## API

```html
<dx-footer [tile]="tile"></dx-footer>
```

### dx-footer

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[tile]` | Tile configuration that drives the footer label and value | `tile` | - |

### Types

```typescript
interface tile {
  titleTt?: string;         // tile title translation key
  applicationIcon?: string; // leading icon name
  descriptionTt?: string;   // description translation key
  footerTt?: string;        // footer label translation key (rendered by dx-footer)
  footerValue?: number;     // numeric value rendered in the footer
  openNewTabFg?: boolean;
  tileSize?: string;
  type?: string;
}
```

## Examples

### Basic

```typescript
tile: tile = {
  footerTt: 'dx.dashboard.totalUsers',
  footerValue: 128
};
```

```html
<dx-footer [tile]="tile"></dx-footer>
```

### Inside a tile

```html
<dx-basic-tile [tile]="tile">
  <dx-footer [tile]="tile"></dx-footer>
</dx-basic-tile>
```

## Import

```typescript
import { DxFooterModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxFooterModule]
})
export class YourModule { }
```
