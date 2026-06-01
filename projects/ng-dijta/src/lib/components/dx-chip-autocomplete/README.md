---
category: Components
type: Data Entry
title: Chip Autocomplete
---

A multi-select autocomplete that renders selected values as removable chips. Wraps Angular Material `mat-select` with `mat-chip-listbox` and supports grouped options, inline search, and an optional "create new option" action.

## When To Use

- When users need to select multiple values from a searchable list and see selections as chips.
- When the list of options is long and should be filterable inline.
- When options are organized into groups (e.g., countries by region).
- When you want to let users create a new option on the fly from the dropdown.

## Label Variants

`dx-chip-autocomplete` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-chip-autocomplete formControlName="tags">
  <dx-label>Display Label</dx-label>
</dx-chip-autocomplete>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-chip-autocomplete outline="outer-label" formControlName="tags">
  <p dxLabel>Display Label</p>
</dx-chip-autocomplete>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-chip-autocomplete
  [options]="options"
  [(ngModel)]="selected"
  (onSelectChange)="onChange($event)">
  <dx-label>Tags</dx-label>
</dx-chip-autocomplete>
```

### dx-chip-autocomplete

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[options]` | Flat list of selectable options | `KeyValueModel[]` | `-` |
| `[groups]` | Grouped options (mutually exclusive with `options`) | `KeyValueGroup[]` | `-` |
| `[loading]` | Shows a spinner while options load | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[disabled]` | Disables the control | `boolean` | `false` |
| `[viewOnly]` | Render in view-only mode | `boolean` | `false` |
| `[showToolTip]` | Show tooltips on chips | `boolean` | `true` |
| `[country]` | Enables country-flag rendering for options | `boolean` | `false` |
| `[noneLabel]` | Hide the floating label | `boolean` | `false` |
| `[labelPosition]` | Label placement | `'left' \| 'top'` | `'top'` |
| `[outline]` | Form-field outline variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error style when `outline='outer-label'` | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[noErrorSpace]` | Collapses the error message gap | `boolean` | `false` |
| `[createOption]` | Inline "create new option" configuration | `CreateOption` | `{}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onSelectChange)` | Emitted when the chip selection changes | `EventEmitter<string>` |
| `(onautoCompleteSelect)` | Emitted on each keystroke in the search field | `EventEmitter<string>` |
| `(onClickCreateOption)` | Emitted when the user clicks the "create new option" row | `EventEmitter<void>` |

### Content Slots

- `dx-label` — Field label.
- `[dxLabel]` — Outer label (used when `outline='outer-label'`).
- `dx-suffix` — Custom suffix content in the form field.
- `dx-hint` — Hint text below the field.
- `dx-error` — Validation error message.

### Types

```typescript
interface KeyValueModel {
  keyTt: string;
  valueTt: string;
}

interface KeyValueGroup {
  label: string;
  options: KeyValueModel[];
}

interface CreateOption {
  isShow?: boolean;
  label?: string;
}
```

## Examples

### Basic multi-select

```html
<dx-chip-autocomplete [options]="tagOptions" [(ngModel)]="selectedTags">
  <dx-label>Tags</dx-label>
</dx-chip-autocomplete>
```

### Grouped options

```typescript
regions: KeyValueGroup[] = [
  { label: 'Europe', options: [{ keyTt: 'fr', valueTt: 'France' }, { keyTt: 'de', valueTt: 'Germany' }] },
  { label: 'Asia',   options: [{ keyTt: 'in', valueTt: 'India' },  { keyTt: 'jp', valueTt: 'Japan' }] }
];
```

```html
<dx-chip-autocomplete [groups]="regions" [(ngModel)]="selectedCountries">
  <dx-label>Countries</dx-label>
</dx-chip-autocomplete>
```

### With create-new-option action

```html
<dx-chip-autocomplete
  [options]="skills"
  [createOption]="{ isShow: true, label: 'Add new skill' }"
  (onClickCreateOption)="openCreateSkillDialog()">
  <dx-label>Skills</dx-label>
</dx-chip-autocomplete>
```

## Import

```typescript
import { DxChipAutocompleteModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxChipAutocompleteModule]
})
export class YourModule { }
```
