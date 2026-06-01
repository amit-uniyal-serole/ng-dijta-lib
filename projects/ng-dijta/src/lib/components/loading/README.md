---
category: Components
type: Feedback
title: Loading
---

A reusable loading indicator with two surfaces: the `[dLoading]` directive for in-place overlays on any element, and `LoadingService.open()` for an imperative, full-screen or targeted overlay. Supports a bar style, an infinity-ring style, an optional backdrop, and custom templates.

## When To Use

- When long-running operations need to show a spinner over a specific element without blocking the rest of the page.
- When data fetching should suspend an entire view with a backdrop.
- When multiple concurrent async operations should share one loading state.
- When a custom loading template / animation is required.

## API

### Directive

```html
<div [dLoading]="isLoading" [backdrop]="true" message="Loading data...">
  <!-- content -->
</div>
```

### Service

```typescript
const ref = this.loadingService.open({
  target: this.document.body,
  message: 'Saving...',
  backdrop: true,
  loadingStyle: 'infinity'
});

// when done
ref.loadingInstance.close();
```

### [dLoading] directive

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[loading]` | An `Observable`, `Promise`, `Array<Promise>`, `Array<Observable>`, `Subscription`, or `boolean` that controls visibility | `LoadingType \| boolean` | - |
| `[showLoading]` | Explicit boolean flag to show / hide | `boolean` | - |
| `[backdrop]` | Render a backdrop behind the spinner | `boolean` | - |
| `[message]` | Message shown under the spinner | `string` | - |
| `[loadingStyle]` | Spinner style | `'default' \| 'infinity'` | `'default'` |
| `[loadingTemplateRef]` | Custom template to render instead of the default spinner | `TemplateRef<any>` | - |
| `[positionType]` | CSS `position` applied to the host while loading | `'static' \| 'relative' \| 'absolute' \| 'fixed' \| 'sticky'` | `'relative'` |
| `[view]` | Offset of the spinner within the host | `{ top?: string; left?: string }` | - |
| `[zIndex]` | Overlay z-index | `number` | - |

### d-loading component

The component is rendered by the directive and service; these inputs are set for you, but are available when rendering manually.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[message]` | Message shown under the spinner | `string` | - |
| `[top]` | Vertical position of the spinner | `string` | `'50%'` |
| `[left]` | Horizontal position of the spinner | `string` | `'50%'` |
| `[customPosition]` | Whether a custom position is used | `boolean` | - |
| `[target]` | Target element the loader is attached to | `Element` | - |
| `[zIndex]` | Overlay z-index | `number` | - |
| `[loadingStyle]` | Spinner style | `'default' \| 'infinity'` | `'default'` |
| `[loadingTemplateRef]` | Custom template to render instead of the default spinner | `TemplateRef<any>` | - |

### Service

| Method | Description | Signature |
|--------|-------------|-----------|
| `open` | Opens a loading overlay and returns a handle with `loadingInstance.close()` | `(options?: ILoadingOptions) => { loadingInstance; backdropInstance }` |

### Types

```typescript
type LoadingType =
  | Observable<any>
  | Promise<any>
  | Array<Promise<any>>
  | Array<Observable<any>>
  | Subscription;

type LoadingStyle = 'default' | 'infinity';

interface ILoadingViewPosition {
  top?: string;
  left?: string;
}

interface ILoadingOptions {
  target?: Element;
  zIndex?: number;
  message?: string;
  backdrop?: boolean;
  loadingTemplateRef?: TemplateRef<any>;
  positionType?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  view?: { top?: string; left?: string };
  injector?: Injector;
  loadingStyle?: LoadingStyle;
}
```

## Examples

### Directive with a boolean flag

```html
<div [dLoading]="isSaving" [backdrop]="true" message="Saving...">
  <form>...</form>
</div>
```

### Directive bound to an Observable

```html
<div [dLoading]="request$" loadingStyle="infinity">
  <app-results></app-results>
</div>
```

### Service opening a full-page loader

```typescript
private readonly loading = inject(LoadingService);

load(): void {
  const ref = this.loading.open({ message: 'Loading dashboard...', backdrop: true });
  this.api.getDashboard().subscribe({
    next: () => ref.loadingInstance.close(),
    error: () => ref.loadingInstance.close(),
  });
}
```

### Custom template

```html
<ng-template #spinner>
  <mat-progress-spinner mode="indeterminate" diameter="32"></mat-progress-spinner>
</ng-template>

<div [dLoading]="isLoading" [loadingTemplateRef]="spinner">
  <app-content></app-content>
</div>
```

## Import

```typescript
import { LoadingModule } from '@ngdx/dijta';

@NgModule({
  imports: [LoadingModule]
})
export class YourModule { }
```
