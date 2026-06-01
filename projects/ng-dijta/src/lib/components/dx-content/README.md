---
category: Components
type: Data Display
title: Content
---

A single-line text tile that truncates overflowing content and reveals the full value in a Material tooltip on hover. The text is run through the Transloco pipe so translation keys are rendered correctly.

## When To Use

- When a cell, tile, or chip needs to display text that might exceed its container width.
- When you want the full value to be accessible via tooltip without breaking layout.
- When the value may be a translation key that should be resolved via Transloco.

## API

```html
<dx-content [content]="value"></dx-content>
```

### dx-content

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[content]` | The text (or translation key) to display; full value is shown in a hover tooltip | `string` | `-` |

## Examples

### Plain text value

```html
<dx-content [content]="user.fullName"></dx-content>
```

### Translation key

```html
<dx-content content="dx.status.active"></dx-content>
```

### Inside a table cell

```html
<td mat-cell *matCellDef="let row">
  <dx-content [content]="row.description"></dx-content>
</td>
```

## Import

```typescript
import { DxContentModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxContentModule]
})
export class YourModule { }
```
