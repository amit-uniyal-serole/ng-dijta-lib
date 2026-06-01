---
category: Components
type: Navigation
title: Floater Button
---

A floating action bar that renders a horizontal list of action buttons with icon and label, emitting a single event key per click. Useful as a sticky bottom bar for wizards, mobile flows and contextual actions.

## When To Use

- When a screen needs a persistent bottom action bar with multiple related actions.
- When several primary actions (e.g. *Prev / Save / Next*) must share the same focal area.
- When each action is identified by a unique `event` key and a caller-supplied handler.

## API

```html
<dx-floater-button
  [bottomBarActions]="actions"
  (onSubmit)="handle($event)">
</dx-floater-button>
```

### dx-floater-button

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[bottomBarActions]` | Ordered list of actions to render | `ButtonAction[]` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onSubmit)` | Emitted with the clicked action's `event` key | `EventEmitter<string>` |

### Types

```typescript
interface ButtonAction {
  src?: string;  // image source for the icon
  name: string;  // translation key shown below the icon
  event: string; // unique identifier emitted on click
}
```

## Examples

### Basic

```typescript
actions: ButtonAction[] = [
  { name: 'dx.action.back', src: 'assets/icons/back.svg', event: 'back' },
  { name: 'dx.action.save', src: 'assets/icons/save.svg', event: 'save' },
  { name: 'dx.action.next', src: 'assets/icons/next.svg', event: 'next' }
];

handle(event: string): void {
  // 'back' | 'save' | 'next'
}
```

```html
<dx-floater-button
  [bottomBarActions]="actions"
  (onSubmit)="handle($event)">
</dx-floater-button>
```

### Two-action confirm bar

```html
<dx-floater-button
  [bottomBarActions]="[
    { name: 'dx.action.cancel', src: 'assets/icons/cancel.svg', event: 'cancel' },
    { name: 'dx.action.confirm', src: 'assets/icons/confirm.svg', event: 'confirm' }
  ]"
  (onSubmit)="onAction($event)">
</dx-floater-button>
```

## Import

```typescript
import { DxFloaterButtonModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxFloaterButtonModule]
})
export class YourModule { }
```
