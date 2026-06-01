# DxFloaterButton

A floating action bar component that renders a horizontal list of action buttons at the bottom of the screen.

## Overview

`DxFloaterButton` displays a bottom-anchored bar of labeled action buttons, each optionally accompanied by an icon image. It is suited for mobile-friendly views or detail pages where contextual actions need to remain visible as the user scrolls. Each item in the bar emits an event string on click, letting the parent component respond to each action.

## Module Import

```typescript
import { DxFloaterButtonModule } from 'ng-dijta';

@NgModule({
  imports: [DxFloaterButtonModule]
})
```

## Selector

`<dx-floater-button>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `bottomBarActions` | `Array<ButtonAction>` | — | Array of action items to display in the floating bar. Each item defines a label, event string, and optional icon image. |

#### ButtonAction Interface

```typescript
interface ButtonAction {
  src?: string;   // Path to an icon image displayed above the label
  name: string;   // Display label for the action (supports Transloco i18n)
  event: string;  // Event identifier emitted when this action is clicked
}
```

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `onSubmit` | `EventEmitter<string>` | Emitted when any action button is clicked. Payload is the `event` string from the corresponding `ButtonAction`. |

## Usage Examples

### Basic Usage

```typescript
import { ButtonAction } from 'ng-dijta';

bottomBarActions: ButtonAction[] = [
  { name: 'Save',   event: 'save',   src: 'assets/icons/save.svg' },
  { name: 'Cancel', event: 'cancel' }
];
```

```html
<dx-floater-button
  [bottomBarActions]="bottomBarActions"
  (onSubmit)="onAction($event)">
</dx-floater-button>
```

```typescript
onAction(event: string): void {
  switch (event) {
    case 'save':   this.save();   break;
    case 'cancel': this.cancel(); break;
  }
}
```

### Multiple Actions

```typescript
bottomBarActions: ButtonAction[] = [
  { name: 'Approve', event: 'approve', src: 'assets/icons/check.svg' },
  { name: 'Reject',  event: 'reject',  src: 'assets/icons/close.svg' },
  { name: 'Hold',    event: 'hold',    src: 'assets/icons/pause.svg' }
];
```

```html
<dx-floater-button
  [bottomBarActions]="bottomBarActions"
  (onSubmit)="handleWorkflowAction($event)">
</dx-floater-button>
```

## Features

- Bottom-anchored floating bar suitable for mobile and detail views
- Renders any number of action buttons from a simple array config
- Each action supports an optional image icon above its label
- Single output event with the action's event string as payload
- Transloco i18n support on all action labels
- Lightweight module with no Material dependencies
