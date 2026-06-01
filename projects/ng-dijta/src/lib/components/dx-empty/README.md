---
category: Components
type: Data Display
title: Empty
---

Placeholder component for "no data" states. Renders an illustration, a description line and an optional footer. The `dx-embed-empty` companion selects an appropriate size automatically based on the host component (table / list / select / cascader / transfer).

## When To Use

- When a list, table or panel has no data to render.
- When a search or filter returns no matching results.
- When a default empty illustration and message are sufficient (no custom design needed).
- When an embedded component (table, list, select) needs an automatically sized empty state.

## API

```html
<dx-empty
  [dxNotFoundImage]="'default'"
  [dxNotFoundContent]="'No records found'"
  [dxNotFoundFooter]="footerTpl">
</dx-empty>
```

### dx-empty

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[dxNotFoundImage]` | Built-in image name, image URL, or a `TemplateRef` | `'default' \| 'simple' \| string \| TemplateRef<void> \| null` | `'default'` |
| `[dxNotFoundContent]` | Description text or template. Pass `null` to hide | `string \| TemplateRef<void> \| null` | `-` |
| `[dxNotFoundFooter]` | Optional footer (string or template) | `string \| TemplateRef<void>` | `-` |

### dx-embed-empty

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[nzComponentName]` | Host component name. Drives automatic sizing: `'table' \| 'list' \| 'select' \| 'tree-select' \| 'cascader' \| 'transfer'` | `string` | `-` |
| `[specificContent]` | Override content — string, component `Type` or `TemplateRef` | `DxEmptyCustomContent` | `-` |

### Types

```typescript
type DxEmptySize = 'normal' | 'small' | '';
type DxEmptyCustomContent = Type<any> | TemplateRef<any> | string;
```

## Examples

### Default empty state

```html
<dx-empty></dx-empty>
```

### Simple illustration with custom text

```html
<dx-empty
  dxNotFoundImage="simple"
  dxNotFoundContent="No results match your search">
</dx-empty>
```

### Custom image and action footer

```html
<dx-empty
  [dxNotFoundImage]="'/assets/illustrations/no-data.svg'"
  dxNotFoundContent="You haven't added any items yet"
  [dxNotFoundFooter]="footer">
</dx-empty>

<ng-template #footer>
  <button mat-flat-button color="primary" (click)="create()">Create item</button>
</ng-template>
```

### Hide the description

```html
<dx-empty [dxNotFoundContent]="null"></dx-empty>
```

### Embedded in a data component

```html
<dx-embed-empty nzComponentName="table"></dx-embed-empty>

<dx-embed-empty
  nzComponentName="select"
  [specificContent]="'No options available'">
</dx-embed-empty>
```

## Import

```typescript
import { DxEmptyModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxEmptyModule]
})
export class YourModule { }
```
