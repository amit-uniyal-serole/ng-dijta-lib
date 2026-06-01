---
category: Components
type: Data Entry
title: Criteria Filter
---

Dynamic rule builder that lets users compose AND/OR filter expressions across a configurable list of fields. Each row pairs a field, an operator appropriate for that field's type (string, number, date, picklist, boolean, currency, etc.) and a value editor that switches to the right input control (text, number, date, daterange, datetime, picklist, lookup).

## When To Use

- When building advanced search or report filters that support multiple conditions.
- When users need to combine rules with `AND` / `OR` logical operators and optional grouping brackets.
- When operators must vary per field type (e.g. `contains` for strings, `between` for dates).
- When value editors must adapt per field type (picklist, server-side lookup, currency, datetime).
- When the expression must be stored and re-hydrated through `ReactiveForms`.

## API

```html
<dx-criteria-filter
  formControlName="criteria"
  [columns]="columns"
  [rootUrl]="rootUrl"
  [maxConditions]="10"
  [enablePattern]="true">
</dx-criteria-filter>
```

### dx-criteria-filter

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[columns]` | Fields available for filtering. Each entry provides `keyTt` / `valueTt` and a `data.type` for operator resolution | `KeyValueModel[]` | `[]` |
| `[operators]` | Map of field-type to allowed operators (overrides built-in set) | `Record<string, { valueTt: string; keyTt: string }[]>` | built-in set |
| `[operatorsToHideValueField]` | Operator keys for which the value editor is hidden | `string[]` | `['${HASCHANGED}']` |
| `[readonlyCriteria]` | Renders the builder in read-only mode | `boolean` | `false` |
| `[rootUrl]` | Base URL used to build the user-lookup modal config | `string` | `-` |
| `[enablePattern]` | Enables the bracket-aware expression editor | `boolean` | `false` |
| `[maxConditions]` | Maximum number of rules; `0` means unlimited | `number` | `0` |
| `[singleSelection]` | Restrict picklist / lookup fields to a single value | `boolean` | `false` |
| `[userModalConfig]` | Custom configuration for the user-lookup modal | `DxLookupModalConfig` | auto-generated |

This component implements `ControlValueAccessor`. The exposed value has the shape:

```typescript
interface CriteriaValue {
  expression: string;
  rules: Array<{
    field: string;
    operator: string;
    value: unknown;
    logicalOperator: boolean; // true = AND, false = OR
    data?: unknown;
  }>;
}
```

## Examples

### Basic usage with reactive form

```html
<form [formGroup]="form">
  <dx-criteria-filter
    formControlName="criteria"
    [columns]="columns">
  </dx-criteria-filter>
</form>
```

### With bracket expression editor and a limit

```html
<dx-criteria-filter
  formControlName="criteria"
  [columns]="columns"
  [enablePattern]="true"
  [maxConditions]="5">
</dx-criteria-filter>
```

### Read-only display

```html
<dx-criteria-filter
  formControlName="criteria"
  [columns]="columns"
  [readonlyCriteria]="true">
</dx-criteria-filter>
```

### User-lookup-backed field

```html
<dx-criteria-filter
  formControlName="criteria"
  [columns]="columns"
  [rootUrl]="apiRootUrl"
  [singleSelection]="true">
</dx-criteria-filter>
```

## Import

```typescript
import { DxCriteriaFilterModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxCriteriaFilterModule]
})
export class YourModule { }
```
