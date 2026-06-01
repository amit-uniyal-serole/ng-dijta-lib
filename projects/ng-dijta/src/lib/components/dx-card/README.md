---
category: Components
type: Data Display
title: Card
---

A container component for grouping related content into a bordered, titled surface. The module also exports a family of card-variant and card-field components (profile, description, listing, date, currency, accordion, form card, list-view, details card, tiles) used to compose richer card layouts.

## When To Use

- When you need to group related information into a visually distinct surface.
- When a section needs an optional heading and padding around projected content.
- As the base wrapper for richer card variants (details card, form card, list view, tiles) exported from the same module.
- When you want a consistent card shell across dashboards, detail pages, and list items.

## API

```html
<dx-card title="User Details">
  <p>Card content goes here.</p>
</dx-card>
```

### dx-card

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[title]` | Optional heading rendered at the top of the card | `string` | `-` |
| `[borderNone]` | Removes the card's inner padding (compact mode) | `boolean` | `false` |

### Types

```typescript
export type DX_CARD_TYPE = 'basic';

export interface DxCardConfig {
  cardConfig?: CardConfig;
  basicCardConfig?: BasicVariant;
}

export interface BasicVariant {
  profile?: CardProfileSetting;
  description?: CardDescription;
  contentListing?: CardContentListing[];
  tiles?: CardTileDetails[];
  actions?: MultiActionButtonSettings;
  actionGroup?: GroupAction;
}
```

## Examples

### Basic

```html
<dx-card title="Policy Summary">
  <p>Policy number: ABC-12345</p>
  <p>Status: Active</p>
</dx-card>
```

### Without title

```html
<dx-card>
  <dx-card-profile [profile]="profileSetting"></dx-card-profile>
  <dx-card-description [description]="descriptionSetting"></dx-card-description>
</dx-card>
```

### Compact (no inner padding)

```html
<dx-card title="Recent Activity" [borderNone]="true">
  <dx-card-listing [listing]="activityItems"></dx-card-listing>
</dx-card>
```

### As a details-card shell

```html
<dx-card title="Applicant">
  <dx-details-card [config]="detailsConfig"></dx-details-card>
</dx-card>
```

## Import

```typescript
import { DxCardModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxCardModule]
})
export class YourModule { }
```
