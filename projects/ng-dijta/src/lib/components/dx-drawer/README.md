---
category: Components
type: Feedback
title: Drawer
---

A side-panel overlay (drawer) that slides in from any edge of the viewport. Supports template or component content, title / extra / footer slots, optional mask, keyboard dismissal, RTL direction, and programmatic opening via `DxDrawerService`.

## When To Use

- When extra detail, a preview or a secondary workflow should slide in without leaving the page.
- When a form or contextual action should appear alongside the main view (not as a full modal).
- When content size is flexible and benefits from top / bottom / left / right placement.
- When the drawer must be opened imperatively from a service.

## API

```html
<dx-drawer
  [(nzVisible)]="visible"
  dxTitle="Details"
  dxPlacement="right"
  [dxClosable]="true"
  (dxOnClose)="visible = false">
  <ng-container *dxDrawerContent>
    <p>Drawer content goes here.</p>
  </ng-container>
</dx-drawer>
```

### dx-drawer

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[nzVisible]` | Whether the drawer is open (supports two-way binding) | `boolean` | `false` |
| `[dxContent]` | Content as a `TemplateRef` or component `Type` | `TemplateRef \| Type<T>` | `-` |
| `[dxTitle]` | Header title (string or template) | `string \| TemplateRef` | `-` |
| `[dxExtra]` | Extra header area content | `string \| TemplateRef` | `-` |
| `[dxFooter]` | Footer area content | `string \| TemplateRef` | `-` |
| `[dxCloseIcon]` | Close icon (Material icon name or template) | `string \| TemplateRef<void>` | `'close'` |
| `[dxClosable]` | Show the close button | `boolean` | `true` |
| `[dxMask]` | Render the background mask | `boolean` | `true` |
| `[dxMaskClosable]` | Clicking the mask closes the drawer | `boolean` | `true` |
| `[dxMaskStyle]` | Inline style applied to the mask | `NgStyleInterface` | `{}` |
| `[dxBodyStyle]` | Inline style applied to the body | `NgStyleInterface` | `{}` |
| `[dxKeyboard]` | Allow closing with the `Esc` key | `boolean` | `true` |
| `[dxCloseOnNavigation]` | Dismiss on route change | `boolean` | `true` |
| `[dxNoAnimation]` | Disable open / close animation | `boolean` | `false` |
| `[dxPlacement]` | Edge the drawer slides in from | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| `[dxSize]` | Preset size | `'default' \| 'large'` | `'default'` |
| `[dxWidth]` | Explicit width (left / right placements) | `number \| string` | `-` |
| `[dxHeight]` | Explicit height (top / bottom placements) | `number \| string` | `-` |
| `[dxOffsetX]` | Horizontal offset in px | `number` | `0` |
| `[dxOffsetY]` | Vertical offset in px | `number` | `0` |
| `[dxZIndex]` | Overlay z-index | `number` | `1000` |
| `[dxWrapClassName]` | Extra class applied to the wrapper | `string` | `-` |
| `[dxDirection]` | Layout direction | `'ltr' \| 'rtl'` | `-` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(dxOnClose)` | Emitted when the close button or mask is clicked | `EventEmitter<MouseEvent>` |
| `(dxVisibleChange)` | Emitted when visibility changes | `EventEmitter<boolean>` |
| `(dxOnViewInit)` | Emitted after the drawer view is initialised | `EventEmitter<void>` |

### Methods (DxDrawerComponent)

| Method | Description |
|--------|-------------|
| `open()` | Opens the drawer |
| `close(result?)` | Closes the drawer and emits an optional result |
| `getContentComponent()` | Returns the component instance when content was provided as a `Type<T>` |
| `afterOpen` | `Observable<void>` that emits after open animation completes |
| `afterClose` | `Observable<R>` that emits the close result |

### DxDrawerService

```typescript
const ref = this.drawerService.create<MyComponent, { id: string }, string>({
  dxTitle: 'Edit Item',
  dxContent: MyComponent,
  dxContentParams: { id: '123' },
  dxPlacement: 'right',
  dxSize: 'large'
});

ref.afterClose.subscribe(result => {
  // ...
});
```

### Types

```typescript
type DxDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
type DxDrawerSize = 'default' | 'large';

interface DxDrawerOptions<T, D> {
  dxTitle?: string | TemplateRef<{}>;
  dxContent?: TemplateRef<{ $implicit: D; drawerRef: DxDrawerRef }> | Type<T>;
  dxContentParams?: Partial<T & D>;
  dxPlacement?: DxDrawerPlacement;
  dxSize?: DxDrawerSize;
  dxWidth?: number | string;
  dxHeight?: number | string;
  dxClosable?: boolean;
  dxMask?: boolean;
  dxMaskClosable?: boolean;
  dxKeyboard?: boolean;
  dxNoAnimation?: boolean;
  nzOnCancel?(): Promise<unknown>;
}
```

## Examples

### Template-driven drawer

```html
<button mat-flat-button (click)="visible = true">Open</button>

<dx-drawer
  [(nzVisible)]="visible"
  dxTitle="Details"
  dxPlacement="right"
  (dxOnClose)="visible = false">
  <ng-container *dxDrawerContent>
    <p>Details content...</p>
  </ng-container>
</dx-drawer>
```

### Large left-hand drawer with custom footer

```html
<dx-drawer
  [(nzVisible)]="visible"
  dxTitle="Settings"
  dxPlacement="left"
  dxSize="large"
  [dxFooter]="footer"
  (dxOnClose)="visible = false">
  <ng-container *dxDrawerContent>
    <settings-form></settings-form>
  </ng-container>
</dx-drawer>

<ng-template #footer>
  <button mat-stroked-button (click)="visible = false">Cancel</button>
  <button mat-flat-button color="primary" (click)="save()">Save</button>
</ng-template>
```

### Opened programmatically from a service

```typescript
constructor(private readonly drawerService: DxDrawerService) {}

openDetails(id: string): void {
  const ref = this.drawerService.create<DetailsComponent, { id: string }, boolean>({
    dxTitle: 'Details',
    dxContent: DetailsComponent,
    dxContentParams: { id },
    dxPlacement: 'right'
  });

  ref.afterClose.subscribe(saved => {
    if (saved) {
      this.reload();
    }
  });
}
```

### No-mask, bottom placement

```html
<dx-drawer
  [(nzVisible)]="visible"
  dxTitle="Quick edit"
  dxPlacement="bottom"
  [dxMask]="false"
  dxHeight="320px"
  (dxOnClose)="visible = false">
  <ng-container *dxDrawerContent>
    <quick-edit></quick-edit>
  </ng-container>
</dx-drawer>
```

## Import

```typescript
import { DxDrawerModule, DxDrawerServiceModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxDrawerModule, DxDrawerServiceModule]
})
export class YourModule { }
```
