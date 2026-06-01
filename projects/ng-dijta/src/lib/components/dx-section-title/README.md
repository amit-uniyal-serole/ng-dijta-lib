---
category: Components
type: Layout
title: Section Title
---

A standardized section header with an optional icon, title, and action buttons. Useful for delineating logical sections inside pages, cards, or forms.

## When To Use

- When grouping related content under a visually consistent heading.
- When a section needs inline action buttons (e.g. *Add*, *Save*, *Edit*).
- Prefer a plain heading element (`<h2>`) when no icon or action buttons are required.

## API

```html
<dx-section-title
  title="Personal Details"
  icon="person"
  [showBtns]="true"
  [buttonConfig]="buttonConfig"
  (onClickBtn)="onAction($event)"
  (onClickSaveBtn)="onSave()">
</dx-section-title>
```

### dx-section-title

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[title]` | Section heading text | `string` | - |
| `[icon]` | Material icon name shown next to the title | `string` | - |
| `[fill]` | Applies a filled background style | `boolean` | `false` |
| `[showBtns]` | Shows configured action buttons | `boolean` | `false` |
| `[buttonConfig]` | Action-button configuration | `DxSectionButtonConfig` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onClickBtn)` | Emitted with the button event key when an action button is clicked | `EventEmitter<string>` |
| `(onClickSaveBtn)` | Emitted when the save button is clicked | `EventEmitter<unknown>` |

### Types

```typescript
class DxSectionButtonConfig {
  icon?: string;
  label?: string;
  type?: any;
  visible?: boolean;
  color?: string;
}
```

## Examples

### Basic title with icon

```html
<dx-section-title title="Overview" icon="info"></dx-section-title>
```

### Filled header with action button

```typescript
buttonConfig: DxSectionButtonConfig = {
  icon: 'add',
  label: 'Add Item',
  visible: true,
  color: '#1976d2'
};
```

```html
<dx-section-title
  title="Line Items"
  icon="list"
  [fill]="true"
  [showBtns]="true"
  [buttonConfig]="buttonConfig"
  (onClickBtn)="onAddItem()">
</dx-section-title>
```

### With save button

```html
<dx-section-title
  title="Edit Profile"
  icon="edit"
  [showBtns]="true"
  [buttonConfig]="{ label: 'Save', visible: true }"
  (onClickSaveBtn)="onSaveProfile()">
</dx-section-title>
```

## Import

```typescript
import { DxSectionTitleModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxSectionTitleModule]
})
export class YourModule { }
```
