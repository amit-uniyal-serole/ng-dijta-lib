---
category: Components
type: Data Display
title: Email
---

Email client layout that composes a folder menu, an email list (card or table view), a detail view and a compose dialog into a single responsive shell. Automatically collapses to a mobile-friendly layout below 767px.

## When To Use

- When the application needs an email / message centre style UI.
- When users browse messages in folders (Inbox, Sent, Draft, etc.) and read them in a detail panel.
- When a composer dialog is needed for new / reply / forward messages.
- When the list view must switch between card-style and tabular layouts.

## API

```html
<dx-email
  [emailsList]="emails"
  [emailListType]="'card'"
  (onClickMenu)="onMenuClick($event)">
</dx-email>
```

### dx-email

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[emailsList]` | Emails to display in the list | `any[]` | `-` |
| `[emailListType]` | List layout variant (e.g. `'card'` / `'table'`) | `string` | `-` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onClickMenu)` | Emitted when a folder / menu item is selected | `EventEmitter<any>` |

### Methods

| Method | Description |
|--------|-------------|
| `newEmail(email)` | Prepend a new email to the top of the list |
| `selectedEmail(email)` | Select an email and show it in the detail view |
| `toggleMenu(event)` | Toggle the folder menu (mobile) |

### Companion Components

The `DxEmailModule` also exports:

| Selector | Purpose |
|----------|---------|
| `email-menu` | Folder / category navigation |
| `email-list` | Card-style list of emails |
| `email-list-table-view` | Tabular list of emails |
| `email-detail-view` | Reading pane for the selected email |
| `email-compose` | Composer dialog (new / reply / forward) |

## Examples

### Basic

```html
<dx-email
  [emailsList]="emails"
  emailListType="card"
  (onClickMenu)="onFolderChange($event)">
</dx-email>
```

### Table-style list

```html
<dx-email
  [emailsList]="emails"
  emailListType="table"
  (onClickMenu)="onFolderChange($event)">
</dx-email>
```

### Adding a new email after composing

```typescript
@ViewChild(DxEmailComponent) emailShell!: DxEmailComponent;

onComposeSent(newEmail: any): void {
  this.emailShell.newEmail(newEmail);
}
```

## Import

```typescript
import { DxEmailModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxEmailModule]
})
export class YourModule { }
```
