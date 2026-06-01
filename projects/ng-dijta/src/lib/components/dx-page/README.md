---
category: Components
type: Feedback
title: Page — 403 Forbidden
---

Pre-built *403 / Access Denied* page illustration and message. Provides two visual variants (a compact icon + text, or a full-screen illustration) toggled via a single input.

## When To Use

- When a route guard blocks the user and you need a consistent, branded *access denied* placeholder.
- When showing inline permission-denied feedback inside a page region (use the compact variant).
- When a full-screen empty state is preferred for top-level unauthorized routes.
- Pair with an auth guard that redirects to a route hosting this component.

## API

```html
<lib-403 [isNewUI]="true"></lib-403>
```

### lib-403

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[isNewUI]` | Use the compact illustration + translated message (`true`) or the legacy full-screen illustration (`false`) | `boolean` | `true` |

## Examples

### Compact variant (default)

```html
<lib-403></lib-403>
```

### Legacy full-screen variant

```html
<lib-403 [isNewUI]="false"></lib-403>
```

### In a route

```typescript
const routes: Routes = [
  { path: 'forbidden', component: Lib403Component }
];
```

## Import

```typescript
import { DxStandardPageModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxStandardPageModule]
})
export class YourModule { }
```
