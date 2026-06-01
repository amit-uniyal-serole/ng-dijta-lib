---
category: Components
type: Feedback
title: Modal
---

A configurable modal / dialog system. Consumers call `ModalService.open()` to imperatively display any component as a modal with placement, animation, draggability, ESC handling, and custom content-template support. A separate `DialogService` provides a button-based confirmation dialog on top of the same primitive.

## When To Use

- When a complex component needs to be shown in an overlay (wizards, forms, detail views).
- When overlays need animation, draggable headers, or a customizable placement (top / center / bottom).
- When ESC / backdrop-click closing must be configurable.
- When the app needs a consistent confirmation dialog through `DialogService`.

## API

```typescript
import { ModalService } from '@ngdx/dijta';

private readonly modalService = inject(ModalService);

openMyModal(): void {
  const ref = this.modalService.open({
    id: 'my-modal',
    component: MyModalContentComponent,
    width: '480px',
    placement: 'center',
    backdropCloseable: true,
    data: { userId: this.userId },
    onClose: () => this.refresh()
  });

  // programmatic close
  ref.modalInstance.hide();
}
```

### ModalService

| Method | Description | Signature |
|--------|-------------|-----------|
| `open` | Opens a modal and returns `{ modalInstance, modalContentInstance }` | `(options: IModalOptions) => { modalInstance: ModalComponent; modalContentInstance: any }` |

### d-modal component

The component is rendered by `ModalService`; these inputs are assigned from `IModalOptions`. Use them when rendering `<d-modal>` manually.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[id]` | Unique modal id | `string` | - |
| `[width]` | Modal width | `string` | - |
| `[zIndex]` | Modal z-index | `number` | - |
| `[backDropZIndex]` | Backdrop z-index | `number` | - |
| `[showAnimation]` | Play the show / hide animation | `boolean` | `true` |
| `[backdropCloseable]` | Close the modal when the backdrop is clicked | `boolean` | `true` |
| `[escapable]` | Close the modal when ESC is pressed | `boolean` | - |
| `[bodyScrollable]` | Allow the body to scroll while the modal is open | `boolean` | `true` |
| `[placement]` | Vertical placement | `'center' \| 'top' \| 'bottom'` | `'center'` |
| `[offsetX]` | Horizontal offset from `placement` | `string` | - |
| `[offsetY]` | Vertical offset from `placement` | `string` | - |
| `[draggable]` | Allow dragging via the header | `boolean` | - |
| `[cssClass]` | Extra CSS class applied to the modal | `string` | - |
| `[beforeHidden]` | Guard called before hiding; return `false` to cancel | `() => boolean \| Promise<boolean> \| Observable<boolean>` | - |

### Methods (modal instance)

| Method | Description | Signature |
|--------|-------------|-----------|
| `show` | Show the modal | `() => void` |
| `hide` | Hide the modal | `() => void` |
| `maximize` | Toggle full-screen size | `() => void` |

### Types

```typescript
interface IModalOptions {
  id?: string;
  component?: Type<any>;
  data?: any;
  handler?: Function;
  width?: string;
  zIndex?: number;
  backDropZIndex?: number;
  showAnimation?: boolean;
  backdropCloseable?: boolean;
  escapable?: boolean;
  bodyScrollable?: boolean;
  placement?: 'center' | 'top' | 'bottom';
  offsetX?: string;
  offsetY?: string;
  contentTemplate?: TemplateRef<any>;
  cssClass?: string;
  beforeHidden?: () => boolean | Promise<boolean> | Observable<boolean>;
  onClose?: Function;
  injector?: Injector;
  componentFactoryResolver?: ComponentFactoryResolver;
}

interface IDialogOptions {
  id?: string;
  title?: string;
  content?: string | Type<any>;
  html?: boolean;
  buttons: Array<{
    id?: string;
    cssClass?: string;
    text: string;
    handler: ($event: Event) => void;
    btnwidth?: string;
    autofocus?: boolean;
    disabled?: boolean;
  }>;
  width?: string;
  maxHeight?: string;
  showMaximizeBtn?: boolean;
  showCloseBtn?: boolean;
  draggable?: boolean;
  dialogtype?: string;
  backdropCloseable?: boolean;
  escapable?: boolean;
  placement?: 'center' | 'top' | 'bottom';
  offsetX?: string;
  offsetY?: string;
  onClose?: Function;
  onMaximize?: Function;
  beforeHidden?: () => boolean | Promise<boolean> | Observable<boolean>;
}
```

## Examples

### Open a component in a modal

```typescript
openUserDetails(userId: string): void {
  const ref = this.modalService.open({
    component: UserDetailsComponent,
    width: '640px',
    data: { userId },
    backdropCloseable: false
  });

  ref.modalInstance.beforeHidden = () =>
    confirm('Discard changes?');
}
```

### Confirmation dialog via DialogService

```typescript
private readonly dialog = inject(DialogService);

confirmDelete(): void {
  this.dialog.open({
    title: 'Delete item',
    content: 'Are you sure you want to delete this item?',
    buttons: [
      { text: 'Cancel', cssClass: 'dx-btn-common', handler: () => this.dialogRef?.close() },
      { text: 'Delete',  cssClass: 'dx-btn-danger', handler: () => this.performDelete() }
    ]
  });
}
```

### Placement with custom offset

```typescript
this.modalService.open({
  component: QuickActionsComponent,
  placement: 'top',
  offsetY: '40px',
  width: '380px'
});
```

## Import

```typescript
import { ModalModule } from '@ngdx/dijta';

@NgModule({
  imports: [ModalModule]
})
export class YourModule { }
```
