---
category: Components
type: Feedback
title: Skeleton Loader
---

Content placeholder that shows an animated silhouette while data loads. Supports line and circle appearances, several animation styles, repeat count, and per-instance theming.

## When To Use

- Indicate loading state for lists, cards, avatars, or table rows before real content is available.
- Reduce perceived latency by reserving layout space up front.
- Replace generic spinners where content shape is known (text block, avatar, chip, button).
- Render multiple placeholders by setting `count` to the expected number of rows.

## API

```html
<dx-skeleton-loader
  count="5"
  appearance="line"
  animation="progress"
  [theme]="{ width: '200px', height: '20px', 'border-radius': '4px' }">
</dx-skeleton-loader>
```

### dx-skeleton-loader

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[count]` | Number of skeleton items to render | `number` | `1` |
| `[appearance]` | Visual shape of each placeholder | `'circle' \| 'line' \| ''` | `'line'` |
| `[animation]` | Animation style | `'progress' \| 'progress-dark' \| 'pulse' \| 'false' \| false` | `'progress'` |
| `[theme]` | Per-instance style overrides (ngStyle-compatible map of CSS properties) | `NgxSkeletonLoaderConfigTheme` | `null` |
| `[loadingText]` | Screen-reader loading label | `string` | `'Loading...'` |
| `[ariaLabel]` | ARIA label for the skeleton region | `string` | `'loading'` |

### Types

```typescript
type NgxSkeletonLoaderConfigTheme = { [k: string]: any } | null;

interface NgxSkeletonLoaderConfig {
  appearance: 'circle' | 'line' | '';
  animation: 'progress' | 'progress-dark' | 'pulse' | 'false' | false;
  theme: NgxSkeletonLoaderConfigTheme;
  loadingText: string;
  count: number;
  ariaLabel: string;
}
```

The library ships a `Skeleton` helper (with presets such as `Skeleton.Icon`, `Skeleton.Text`, `Skeleton.Avatar`, `Skeleton.Button`, `Skeleton.chip`) that can be passed directly to `[theme]`.

## Examples

### Basic line placeholder

```html
<dx-skeleton-loader></dx-skeleton-loader>
```

### Multiple lines

```html
<dx-skeleton-loader count="5" appearance="line"></dx-skeleton-loader>
```

### Circle (avatar) placeholder

```html
<dx-skeleton-loader
  appearance="circle"
  [theme]="{ width: '40px', height: '40px' }">
</dx-skeleton-loader>
```

### Custom theme via preset

```typescript
import { Skeleton } from '@ngdx/dijta';

readonly buttonTheme = Skeleton.Button;
```

```html
<dx-skeleton-loader [theme]="buttonTheme"></dx-skeleton-loader>
```

### Pulse animation

```html
<dx-skeleton-loader
  count="3"
  animation="pulse"
  [theme]="{ width: '100%', height: '16px', 'margin-bottom': '8px' }">
</dx-skeleton-loader>
```

## Import

```typescript
import { DxSkeletonLoaderModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxSkeletonLoaderModule]
})
export class YourModule { }
```

A root-level default configuration may be supplied via `DxSkeletonLoaderModule.forRoot({ ... })`.
