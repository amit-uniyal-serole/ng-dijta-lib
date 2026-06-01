---
category: Components
type: Layout
title: Layout
---

Page layout primitives composed of header, footer, content, and collapsible sider regions. Provides a flexible grid for building application shells, with RTL awareness and responsive sider behaviour.

## When To Use

- When composing an application shell with a header, optional sidebar, main content, and footer.
- When you need a collapsible, responsive sider that reacts to breakpoints.
- When the layout must switch direction based on the active `Directionality` (LTR / RTL).
- Use nested `<dx-layout>` instances to create mixed horizontal / vertical regions.

## API

```html
<dx-layout>
  <dx-layout-header>Header</dx-layout-header>
  <dx-layout>
    <dx-layout-sider [nzCollapsible]="true" [(nzCollapsed)]="collapsed">Menu</dx-layout-sider>
    <dx-layout-content>Content</dx-layout-content>
  </dx-layout>
  <dx-layout-footer>Footer</dx-layout-footer>
</dx-layout>
```

### dx-layout

The root flex container. It adjusts its direction automatically when a sider is projected. Uses content projection for its children; no inputs.

### dx-layout-header

Fixed-height header region. Uses content projection for its contents; no inputs.

### dx-layout-content

Main content region. Uses content projection for its contents; no inputs.

### dx-layout-footer

Footer region. Uses content projection for its contents; no inputs.

### dx-layout-sider

Collapsible side navigation rail.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[nzWidth]` | Width when expanded (px or CSS value) | `string \| number` | `200` |
| `[nzCollapsedWidth]` | Width when collapsed (in px) | `number` | `80` |
| `[nzTheme]` | Sider color scheme | `'light' \| 'dark'` | `'dark'` |
| `[nzCollapsible]` | Whether the sider can be collapsed | `boolean` | `false` |
| `[nzCollapsed]` | Whether the sider is currently collapsed | `boolean` | `false` |
| `[nzReverseArrow]` | Reverse the direction of the collapse arrow | `boolean` | `false` |
| `[nzBreakpoint]` | Responsive breakpoint at which the sider auto-collapses | `NzBreakpointKey \| null` | `null` |
| `[nzTrigger]` | Custom trigger template; pass `null` to hide the default trigger | `TemplateRef<void> \| null` | `-` |
| `[nzZeroTrigger]` | Trigger template rendered when `nzCollapsedWidth` is `0` | `TemplateRef<void> \| null` | `null` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(nzCollapsedChange)` | Emitted when the sider's collapsed state changes | `EventEmitter<boolean>` |

## Examples

### Basic layout

```html
<dx-layout>
  <dx-layout-header>Header</dx-layout-header>
  <dx-layout-content>Main content</dx-layout-content>
  <dx-layout-footer>Footer</dx-layout-footer>
</dx-layout>
```

### Layout with collapsible sider

```html
<dx-layout>
  <dx-layout-sider
    [nzCollapsible]="true"
    [nzBreakpoint]="'lg'"
    [(nzCollapsed)]="collapsed">
    <nav>Navigation</nav>
  </dx-layout-sider>

  <dx-layout>
    <dx-layout-header>Header</dx-layout-header>
    <dx-layout-content>Content area</dx-layout-content>
    <dx-layout-footer>Footer</dx-layout-footer>
  </dx-layout>
</dx-layout>
```

## Import

```typescript
import { DxLayoutModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxLayoutModule]
})
export class YourModule { }
```
