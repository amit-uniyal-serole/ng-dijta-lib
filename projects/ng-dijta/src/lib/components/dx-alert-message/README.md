---
category: Components
type: Feedback
title: Alert Message
---

A compact inline message used to surface success or error feedback near form fields and actions.

## When To Use

- Displaying a short inline success confirmation after a user action.
- Surfacing a validation or server error next to the control that produced it.
- Announcing feedback without opening a snackbar or dialog.

## API

```html
<dx-alert-message msg="Saved successfully" type="success"></dx-alert-message>
```

### dx-alert-message

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[msg]` | Text to display | `string` | - |
| `[type]` | Severity variant | `'success' \| 'error'` | `'error'` |

## Examples

### Error message

```html
<dx-alert-message
  msg="Please enter a valid email address"
  type="error">
</dx-alert-message>
```

### Success message

```html
<dx-alert-message
  msg="Profile updated"
  type="success">
</dx-alert-message>
```

## Import

```typescript
import { DxAlertMessageModule } from '@ngdx/dijta';

@NgModule({ imports: [DxAlertMessageModule] })
export class YourModule { }
```
