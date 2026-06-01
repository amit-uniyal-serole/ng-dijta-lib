---
category: Components
type: Data Display
title: Title
---

A lightweight section title that renders a Material icon alongside a text label. Used as a standard header for cards, panels, and form sections.

## When To Use
- When a page section or card needs a small titled header with an optional icon.
- When you want a consistent heading style across the application without styling each heading manually.
- When the title text comes from a Transloco key and must render alongside a leading icon.

## API

```html
<dx-title title="User profile" icon="person"></dx-title>
```

### dx-title

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[title]` | Title text (required) | `string` | - |
| `[icon]` | Material icon name rendered before the title | `string` | - |

## Examples

### Title only

```html
<dx-title title="Settings"></dx-title>
```

### Title with icon

```html
<dx-title title="Notifications" icon="notifications"></dx-title>
```

### With a translated label

```html
<dx-title [title]="'dx.section.billing' | transloco" icon="receipt"></dx-title>
```

## Import

```typescript
import { DxTitleModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTitleModule]
})
export class YourModule { }
```
