---
category: Components
type: Data Entry
title: Tag Input
---

Form-integrated tag picker that lets users select from a suggested list or create new tags on the fly, each with a color. Implements `ControlValueAccessor` and `Validator`, so it plugs into reactive forms like a regular input.

## When To Use

- Let users assign arbitrary tags to a record with autocomplete over an existing catalog.
- Allow users to create new tags inline, including picking a color from a palette.
- Bind the resulting `Tag[]` value to a reactive form control for validation and submission.
- Display tags in read-only contexts with the companion `dx-tag` presentational component.

## Label Variants

`dx-tag-input` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-tag-input formControlName="tags">
  <dx-label>Display Label</dx-label>
</dx-tag-input>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-tag-input outline="outer-label" formControlName="tags">
  <p dxLabel>Display Label</p>
</dx-tag-input>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-tag-input
  formControlName="tags"
  [availableTag]="availableTags"
  [palette]="palette"
  labelPosition="top"
  outline="none-floating"
  (blur)="onBlur($event)">
</dx-tag-input>
```

### dx-tag-input

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[availableTag]` | Catalog of selectable tags used for autocomplete | `Tag[]` | `[]` |
| `[palette]` | Color palette offered when creating a new tag | `string[]` | 15-color default palette |
| `[key]` | Property name used for each tag's id (e.g. `'pkId'`) | `string` | `''` |
| `[maxlength]` | Max length of a new tag name | `number` | `25` |
| `[minLength]` | Minimum input length | `number` | - |
| `[maxLength]` | Maximum input length | `number` | - |
| `[outline]` | Field outline style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[labelPosition]` | Label placement | `'left' \| 'top'` | `'top'` |
| `[outerLabelErrorType]` | Error style when `outline="outer-label"` | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[disabled]` | Disables the input | `boolean` | `false` |
| `[readonly]` | Makes the input read-only | `boolean` | `false` |
| `[viewOnly]` | Renders tags without editing affordances | `boolean` | `false` |
| `[noneLabel]` | Hides the field label | `boolean` | `false` |
| `[focus]` | Auto-focus the input on init | `boolean` | `false` |
| `[autofocus]` | HTML autofocus attribute | `boolean` | `false` |
| `[row]` | Number of visible rows for wrapped chips | `number` | `2` |
| `[isFilter]` | Filter available tags as the user types | `boolean` | `true` |
| `[allowDelete]` | Allow removing tags | `boolean` | `true` |
| `[disableCreate]` | Disable inline creation of new tags | `boolean` | `false` |
| `[disableTagCreation]` | Disable the tag-creation flow entirely | `boolean` | `false` |
| `[isColorPickerOpen]` | Open the color picker overlay | `boolean` | `false` |
| `[xPosition]` | Menu horizontal position | `'before' \| 'after'` | `'after'` |
| `[yPosition]` | Menu vertical position | `'above' \| 'below'` | `'below'` |
| `[tooltip]` | Tooltip shown on the field | `string \| undefined` | - |
| `[required]` | Marks the input as required | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted on field blur | `EventEmitter<FocusEvent>` |

### Types

```typescript
interface Tag {
  name?: string;
  colorCode?: string;
  id?: string | number;
  recordId?: number;
}
```

### dx-tag (presentational)

Read-only tag list rendered with Material icons and an overflow menu.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[tags]` | Tags to display; first two render inline, the rest collapse into a `+N` menu | `Tag[]` | `[]` |

## Examples

### Reactive form usage

```typescript
form = this.fb.group({
  tags: this.fb.control<Tag[]>([])
});

availableTags: Tag[] = [
  { id: 1, name: 'Billing',  colorCode: '#3498DB' },
  { id: 2, name: 'Priority', colorCode: '#E67E22' }
];
```

```html
<form [formGroup]="form">
  <dx-tag-input formControlName="tags" [availableTag]="availableTags"></dx-tag-input>
</form>
```

### Required + color palette

```html
<dx-tag-input
  formControlName="tags"
  [availableTag]="availableTags"
  [palette]="['#FF5733','#3498DB','#2ECC71']"
  [required]="true">
</dx-tag-input>
```

### Read-only preview

```html
<dx-tag [tags]="record.tags"></dx-tag>
```

### Outer-label layout

```html
<dx-tag-input
  formControlName="tags"
  [availableTag]="availableTags"
  outline="outer-label"
  labelPosition="left">
</dx-tag-input>
```

## Import

```typescript
import { DxTagInputModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTagInputModule]
})
export class YourModule { }
```
