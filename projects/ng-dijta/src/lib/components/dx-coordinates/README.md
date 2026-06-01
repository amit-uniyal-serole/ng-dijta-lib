---
category: Components
type: Data Entry
title: Coordinates
---

Geographic coordinate input that accepts latitude/longitude values in either Decimal Degrees (DD) or Degrees-Minutes-Seconds (DMS) format. Integrates with Angular `ReactiveForms` via `ControlValueAccessor` and `Validator`.

## When To Use

- When capturing geographic locations (latitude, longitude) on a form.
- When the user may input coordinates in either `DD` or `DMS` notation.
- When the field should participate in reactive-form validation (required / custom).
- When the label, outline and error treatment must match other `dx-*` form controls.

## Label Variants

`dx-coordinates` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-coordinates formControlName="location">
  <dx-label>Display Label</dx-label>
</dx-coordinates>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-coordinates outline="outer-label" formControlName="location">
  <p dxLabel>Display Label</p>
</dx-coordinates>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-coordinates
  formControlName="location"
  coordinateFormat="DMS"
  [direction]="1"
  tooltip="Enter site coordinates">
  <dx-label>Location</dx-label>
</dx-coordinates>
```

### dx-coordinates

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[coordinateFormat]` | Input format used to parse and display the value | `'DD' \| 'DMS'` | `'DMS'` |
| `[direction]` | Axis direction the input represents (see `Direction` enum) | `Direction` | `1` |
| `[outline]` | Field outline / label style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[labelPosition]` | Label placement when using outer label | `'left' \| 'top'` | `'top'` |
| `[outerLabelErrorType]` | Error rendering style for outer-label mode | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[tooltip]` | Tooltip / placeholder text | `string` | `-` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[disabled]` | Disables input | `boolean` | `false` |
| `[readonly]` | Renders the input read-only | `boolean` | `false` |
| `[viewOnly]` | Display-only mode (no editing) | `boolean` | `false` |
| `[noneLabel]` | Hide the label slot | `boolean` | `false` |
| `[tabIndex]` | Native tab index | `number` | `-` |
| `[id]` | Host element id (auto-generated when omitted) | `string` | `dx-input-coordinate-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |

### Types

```typescript
enum Direction {
  Latitude = 1,
  Longitude = 2
}

enum TransformationType {
  DD = 'DD',
  DMS = 'DMS'
}

interface CoordinateLatLong {
  latitude: number | null;
  longitude: number | null;
}
```

## Examples

### Basic DMS input

```html
<dx-coordinates formControlName="lat" coordinateFormat="DMS" [direction]="1">
  <dx-label>Latitude</dx-label>
</dx-coordinates>
```

### Decimal degrees

```html
<dx-coordinates formControlName="lng" coordinateFormat="DD" [direction]="2">
  <dx-label>Longitude</dx-label>
</dx-coordinates>
```

### Paired latitude / longitude

```html
<dx-coordinate-lat-long
  formControlName="location"
  coordinateFormat="DMS">
</dx-coordinate-lat-long>
```

### Required, view-only, outer label

```html
<dx-coordinates
  formControlName="lat"
  [required]="true"
  [viewOnly]="isReadMode"
  outline="outer-label"
  labelPosition="top">
  <dx-label>Latitude</dx-label>
</dx-coordinates>
```

## Import

```typescript
import { DxCoordinatesModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxCoordinatesModule]
})
export class YourModule { }
```
