---
category: Components
type: Data Display
title: Tag
---

Colored tag (chip) with optional checkable and closeable modes, a palette of preset color themes, and support for a custom projected view template. Pair with `d-tags` to render a collection that automatically hides overflow items.

## When To Use

- Label or categorize content with short, colored chips (e.g. severity, classification, owner).
- Allow users to toggle tags (`mode="checkable"`) or remove them (`mode="closeable"`).
- Hide tags that exceed the container width with the `d-tags` wrapper and `hideBeyondTags`.

## API

```html
<d-tag
  [tag]="'High priority'"
  labelStyle="red-w98"
  mode="closeable"
  (tagDelete)="removeTag($event)">
</d-tag>
```

### d-tag

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[tag]` | Tag value. If a string is provided it is used as the label | `any` | - |
| `[mode]` | Interaction mode | `'default' \| 'checkable' \| 'closeable'` | `'default'` |
| `[labelStyle]` | Preset color theme key | `'blue-w98' \| 'aqua-w98' \| 'olivine-w98' \| 'green-w98' \| 'yellow-w98' \| 'orange-w98' \| 'red-w98' \| 'pink-w98' \| 'purple-w98' \| ''` | `''` |
| `[customColor]` | Custom CSS color, overrides `labelStyle` | `string` | `''` |
| `[checked]` | Initial checked state (for `mode="checkable"`) | `boolean` | `false` |
| `[titleContent]` | Tooltip content shown on hover | `string` | - |
| `[maxWidth]` | Maximum width of the tag before truncation | `any` | - |
| `[customViewTemplate]` | Template to render custom tag content | `TemplateRef<any>` | - |
| `[beforeDelete]` | Hook invoked before removal; return / resolve to `false` to cancel | `(tag?: any) => boolean \| Promise<boolean> \| Observable<boolean>` | - |
| `[deletable]` | Deprecated; use `mode="closeable"` | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(tagDelete)` | Emitted after the tag is successfully removed | `EventEmitter<{ tag: any; event: MouseEvent }>` |
| `(checkedChange)` | Emitted when the checked state changes (checkable mode) | `EventEmitter<boolean>` |

### d-tags

Container that renders a list of `d-tag` items and can collapse tags that do not fit into a "+N" overflow.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[tags]` | Tag values | `any[]` | `[]` |
| `[displayProperty]` | Property used as the tag label when tags are objects | `string` | `''` |
| `[titleProperty]` | Property used as the tag tooltip | `string` | `''` |
| `[mode]` | Mode applied to each tag | `'default' \| 'checkable' \| 'closeable'` | `'default'` |
| `[hideBeyondTags]` | Collapse overflowing tags into a "+N" indicator | `boolean` | `false` |
| `[beforeDelete]` | Hook invoked before a tag is removed | `() => boolean \| Promise<boolean> \| Observable<boolean>` | - |
| `[deletable]` | Deprecated; use `mode="closeable"` | `boolean` | `false` |

### Events (d-tags)

| Event | Description | Type |
|-------|-------------|------|
| `(tagDelete)` | Emitted with the removed tag, its index, and the source event | `EventEmitter<{ tag: any; index: number; event: MouseEvent }>` |
| `(checkedChange)` | Emitted when a checkable tag toggles | `EventEmitter<{ tag: any; index: number; checked: boolean }>` |

## Examples

### Basic

```html
<d-tag [tag]="'Active'" labelStyle="green-w98"></d-tag>
```

### Custom color

```html
<d-tag [tag]="'Draft'" customColor="#6c63ff"></d-tag>
```

### Closeable

```html
<d-tag
  [tag]="'Tag A'"
  mode="closeable"
  labelStyle="blue-w98"
  (tagDelete)="remove($event)">
</d-tag>
```

### Checkable

```html
<d-tag
  [tag]="'Filter'"
  mode="checkable"
  [(checked)]="isSelected"
  (checkedChange)="toggle($event)">
</d-tag>
```

### Tag list with overflow

```html
<d-tags
  [tags]="tags"
  displayProperty="name"
  [hideBeyondTags]="true"
  mode="closeable"
  (tagDelete)="removeTag($event)">
</d-tags>
```

## Import

```typescript
import { TagsModule } from '@ngdx/dijta';

@NgModule({
  imports: [TagsModule]
})
export class YourModule { }
```
