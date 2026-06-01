# Button (Legacy)

Legacy button directory — superseded by `dx-button`.

## Overview

This directory is a legacy placeholder from an earlier version of ng-dijta. It contains empty subdirectories (`menu-panel/` and `ngx/`) with no active component source files. No Angular module or component is exported from this path.

For all button functionality, use `DxButtonModule` and `<dx-button>` from the `dx-button` component instead.

## Migration

Replace any references to the legacy `button/` component with:

```typescript
import { DxButtonModule } from 'ng-dijta';

@NgModule({
  imports: [DxButtonModule]
})
```

```html
<dx-button
  title="My Button"
  (onActionSelect)="onClick()">
</dx-button>
```

See the [dx-button README](../dx-button/README.md) for the full API.
