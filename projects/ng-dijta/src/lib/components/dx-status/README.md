---
category: Components
type: Data Display
title: Status
---

Colored status chip with a leading indicator dot. Renders as a plain chip or a clickable link, and automatically maps a raw status value to a localized label and color when a `statusList` is provided.

## When To Use

- Display the current state of a record (e.g. *Active*, *Pending*, *Closed*) inside tables, cards, and detail views.
- Make a status actionable by enabling `link` — clicking emits `onStatusClick` so the parent can open a dialog or trigger a workflow.
- Show a skeleton placeholder while the status is being fetched via `isBusy`.

## API

```html
<dx-status
  [status]="row.status"
  [statusList]="statusList"
  [link]="true"
  (onStatusClick)="openStatusDialog(row)">
</dx-status>
```

### dx-status

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[status]` | Raw status key to display (matched against `statusList.keyTt`) | `string \| undefined` | - |
| `[statusList]` | Lookup list used to resolve label and color from the raw status | `KeyValueModel[] \| undefined` | - |
| `[color]` | Fallback color used when `statusList` does not resolve a color | `string \| undefined` | - |
| `[isBusy]` | Show a skeleton loader instead of the chip | `boolean \| undefined` | `false` |
| `[link]` | Render as a clickable, underlined link that emits `onStatusClick` | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onStatusClick)` | Emitted when the chip is clicked. Only fires while `link` is `true` | `EventEmitter<any>` |

### Types

```typescript
interface KeyValueModel {
  keyTt?: string;    // raw status value
  valueTt?: string;  // localized label
  color?: string;    // chip color
}
```

A companion attribute directive `[dxStatusChip]` is also exported and applies the same chip styling to any host element.

## Examples

### Basic status with direct color

```html
<dx-status status="Active" color="#2e7d32"></dx-status>
```

### Mapped via statusList

```typescript
statusList: KeyValueModel[] = [
  { keyTt: 'ACTIVE',  valueTt: 'Active',  color: '#2e7d32' },
  { keyTt: 'PENDING', valueTt: 'Pending', color: '#ed6c02' },
  { keyTt: 'CLOSED',  valueTt: 'Closed',  color: '#9e9e9e' }
];
```

```html
<dx-status [status]="row.status" [statusList]="statusList"></dx-status>
```

### Clickable link

```html
<dx-status
  status="PENDING"
  [statusList]="statusList"
  [link]="true"
  (onStatusClick)="openStatus(row)">
</dx-status>
```

### Loading state

```html
<dx-status [isBusy]="true"></dx-status>
```

### Using the directive on a custom host

```html
<span dxStatusChip [status]="row.status" [statusList]="statusList"></span>
```

## Import

```typescript
import { DxStatusModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxStatusModule]
})
export class YourModule { }
```
