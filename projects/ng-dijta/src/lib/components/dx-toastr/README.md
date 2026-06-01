---
category: Components
type: Feedback
title: Toastr
---

A service-driven notification system for brief, non-blocking feedback messages. Injects the `ToastrService` to show success, error, info, and warning toasts with configurable position, timeout, progress bar, and duplicate handling.

## When To Use
- When the user needs non-blocking feedback after an action (save succeeded, network error, validation warning).
- When a confirmation message should fade automatically without requiring user dismissal.
- When multiple concurrent messages need to stack and auto-manage their lifecycle.
- When you need a unified notification channel shared across unrelated features.

## API

```typescript
private readonly toastr = inject(ToastrService);

this.toastr.success('Saved successfully', 'Done');
this.toastr.error('Could not reach server', 'Network error');
```

### ToastrService

Exposes toast lifecycle methods. There is no `<dx-toastr>` template tag; toasts are rendered by the overlay registered in `DxToastrModule`.

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `success` | Show a success toast | `(message?: string, title?: string, override?: Partial<IndividualConfig>)` | `ActiveToast<any> \| null` |
| `error` | Show an error toast | `(message?: string, title?: string, override?: Partial<IndividualConfig>)` | `ActiveToast<any> \| null` |
| `info` | Show an info toast | `(message?: string, title?: string, override?: Partial<IndividualConfig>)` | `ActiveToast<any> \| null` |
| `warning` | Show a warning toast | `(message?: string, title?: string, override?: Partial<IndividualConfig>)` | `ActiveToast<any> \| null` |
| `show` | Show a generic toast with an explicit type | `(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string)` | `ActiveToast<any> \| null` |
| `showToastr` | Show a toast from a `ToastrConfigModel` payload | `(config: ToastrConfigModel)` | `void` |
| `clear` | Dismiss a single toast (by id) or all toasts | `(toastId?: number)` | `void` |
| `remove` | Remove and destroy a toast by id | `(toastId: number)` | `boolean` |

### IndividualConfig (key fields)

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `timeOut` | Toast time-to-live in milliseconds (`0` disables) | `number` | `5000` |
| `extendedTimeOut` | Time to close after hover | `number` | `1000` |
| `disableTimeOut` | Disable auto-dismiss behaviour | `boolean \| 'timeOut' \| 'extendedTimeOut'` | `false` |
| `closeButton` | Show an explicit close button | `boolean` | `false` |
| `progressBar` | Show a countdown progress bar | `boolean` | `false` |
| `progressAnimation` | Progress bar direction | `'increasing' \| 'decreasing'` | `'decreasing'` |
| `enableHtml` | Render message as HTML (sanitized) | `boolean` | `false` |
| `tapToDismiss` | Click to dismiss | `boolean` | `true` |
| `positionClass` | Overlay position | `'toast-top-right' \| 'toast-top-left' \| 'toast-bottom-right' \| 'toast-bottom-left' \| 'toast-top-center' \| 'toast-bottom-center' \| 'toast-top-full-width' \| 'toast-bottom-full-width' \| 'inline'` | `'toast-top-right'` |
| `toastClass` | Extra CSS class on the toast | `string` | `'ngx-toastr'` |
| `titleClass` | Extra CSS class on the title | `string` | `'toast-title'` |
| `messageClass` | Extra CSS class on the message | `string` | `'toast-message'` |
| `easing` | Animation easing | `string` | `'ease-in'` |
| `easeTime` | Animation duration (ms) | `string \| number` | `300` |
| `newestOnTop` | Stack new toasts on top | `boolean` | `true` |
| `onActivateTick` | Run inside the Angular zone when shown from outside it | `boolean` | `false` |
| `payload` | Custom payload forwarded to the toast component | `any` | `null` |
| `maxOpened` | Maximum concurrent toasts (`0` = unlimited) | `number` | `0` |
| `autoDismiss` | Dismiss the oldest toast when `maxOpened` is reached | `boolean` | `false` |
| `preventDuplicates` | Block duplicate messages | `boolean` | `false` |
| `countDuplicates` | Show a duplicate count on the existing toast | `boolean` | `false` |
| `resetTimeoutOnDuplicate` | Reset timeout when a duplicate fires | `boolean` | `false` |
| `includeTitleDuplicates` | Include title when checking for duplicates | `boolean` | `false` |

### Types

```typescript
type MESSAGE_TYPE = 'success' | 'error' | 'info' | 'warning';

interface ToastrConfigModel {
  message?: string;
  title?: string;
  options?: GlobalConfig;
  type?: MESSAGE_TYPE;
}
```

## Examples

### Success toast

```typescript
this.toastr.success('Changes saved.', 'Success');
```

### Error toast with close button

```typescript
this.toastr.error('Could not save changes.', 'Error', {
  closeButton: true,
  timeOut: 0,
});
```

### Config-driven toast

```typescript
this.toastr.showToastr({
  type: 'warning',
  title: 'Unsaved changes',
  message: 'You have unsaved edits on this page.',
});
```

### Dismiss all

```typescript
this.toastr.clear();
```

## Import

```typescript
import { DxToastrModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxToastrModule]
})
export class YourModule { }
```
