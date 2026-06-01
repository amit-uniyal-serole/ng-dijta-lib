---
category: Components
type: Feedback
title: Loader
---

Full-screen or scoped loading indicator with a catalogue of over fifty animated spinner styles. Can be toggled declaratively via `[show]` / `[showSpinner]` inputs, or imperatively through `DxLoaderService`.

## When To Use

- When a long-running operation (HTTP request, file upload, computation) blocks the UI.
- When you need a full-screen overlay that also traps keyboard events while loading.
- When a scoped loader inside a specific container is preferred over a global one.
- When consistent branding of spinners across an application is required.

## API

```html
<dx-loader
  name="primary"
  type="ball-clip-rotate"
  size="large"
  [show]="isLoading">
  <p>Loading...</p>
</dx-loader>
```

### dx-loader

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[name]` | Unique name for the spinner instance (used by `DxLoaderService`) | `string` | `'primary'` |
| `[type]` | Animation style for the spinner | `LOADERS_TYPE` | `'ball-clip-rotate'` |
| `[size]` | Spinner size | `'default' \| 'small' \| 'medium' \| 'large'` | `'large'` |
| `[color]` | Spinner color (CSS color) | `string` | `'#fff'` |
| `[bdColor]` | Backdrop color (RGBA only) | `string` | `'rgba(51,51,51,0.8)'` |
| `[fullScreen]` | Render as full-screen overlay | `boolean` | `true` |
| `[zIndex]` | CSS `z-index` for the overlay | `number` | `99999` |
| `[template]` | Custom HTML template for the spinner | `string` | `-` |
| `[show]` | Whether the spinner is visible | `boolean` | `false` |
| `[showSpinner]` | Alternative visibility toggle routed through `DxLoaderService` | `boolean` | `false` |
| `[disableAnimation]` | Disable fade-in / fade-out animation | `boolean` | `false` |

### Types

```typescript
type Size = 'default' | 'small' | 'medium' | 'large';

type LOADERS_TYPE =
  | 'ball-8bits' | 'ball-atom' | 'ball-beat' | 'ball-clip-rotate'
  | 'ball-clip-rotate-multiple' | 'ball-clip-rotate-pulse'
  | 'ball-pulse' | 'ball-pulse-sync' | 'ball-scale' | 'ball-spin'
  | 'cog' | 'cube-transition' | 'line-scale' | 'pacman'
  | 'square-jelly-box' | 'timer' | 'triangle-skew-spin'
  /* ...and many more — see dx-loader.enum.ts */;
```

## Examples

### Basic full-screen spinner

```html
<dx-loader
  name="primary"
  type="ball-clip-rotate"
  size="medium"
  [show]="isLoading">
</dx-loader>
```

### Scoped spinner (not full screen)

```html
<div class="dx-panel">
  <dx-loader
    name="panel"
    [fullScreen]="false"
    type="ball-pulse"
    color="#1976d2"
    [show]="isLoading">
  </dx-loader>
  <!-- panel content -->
</div>
```

### With custom template and loading text

```html
<dx-loader
  name="primary"
  [show]="isLoading"
  template='<img src="/assets/loading.gif" alt="" />'>
  <p class="dx-loader__label">Please wait…</p>
</dx-loader>
```

### Controlled via service

```typescript
import { DxLoaderService } from '@ngdx/dijta';

private readonly loader = inject(DxLoaderService);

start(): void {
  this.loader.show('primary');
}

stop(): void {
  this.loader.hide('primary');
}
```

## Import

```typescript
import { DxLoaderModule } from '@ngdx/dijta';

@NgModule({
  imports: [
    DxLoaderModule.forRoot({ type: 'ball-clip-rotate' })
  ]
})
export class YourModule { }
```
