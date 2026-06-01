---
category: Components
type: Feedback
title: Icon Selection Popup
---

Modal icon picker that fetches categories and icons from configured endpoints, supports search, filtering and infinite-paging, and returns the selected icon key. Designed to be opened through `MatDialog`.

## When To Use

- When a user needs to pick an icon from a large, server-backed catalog.
- When icons should be filterable by category and searchable by tag.
- Use it in administration screens for menu / action / entity icon selection.

## API

```typescript
this.dialog.open(DxIconSelectionPopupComponent, {
  width: '720px'
});
```

### dx-icon-selection-popup

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[iconConfig]` | URLs used to fetch categories and icons | `IconConfig` | - |

### Dialog Return Value

`MatDialogRef.afterClosed()` emits the selected icon's key (`string`) on selection, or `undefined` on cancel.

### Types

```typescript
interface IconConfig {
  iconCategoryURL: string;
  iconListURL: string;
}

interface Icons {
  categoryKey?: string;
  categoryName?: string;
  iconKey?: string;
  iconName?: string;
  pkId?: number;
  sizesPx?: number;
  tags?: string;
}
```

## Examples

### Open with `MatDialog`

```typescript
const ref = this.dialog.open(DxIconSelectionPopupComponent, {
  width: '720px'
});

ref.componentInstance.iconConfig = {
  iconCategoryURL: '/api/icon-categories',
  iconListURL:     '/api/icons'
};

ref.afterClosed().subscribe(iconKey => {
  if (iconKey) {
    this.selectedIcon = iconKey;
  }
});
```

### Direct template usage

```html
<dx-icon-selection-popup
  [iconConfig]="{
    iconCategoryURL: '/api/icon-categories',
    iconListURL: '/api/icons'
  }">
</dx-icon-selection-popup>
```

## Import

```typescript
import { DxIconSelectionPopupModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxIconSelectionPopupModule]
})
export class YourModule { }
```
