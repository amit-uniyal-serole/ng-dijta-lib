

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since that user can interact with the Drawer without leaving the current page, tasks can be achieved more efficient within the same context.

## When To Use

* Use a Form to create or edit a set of information.
* Processing subtasks. When subtasks are too heavy for Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
* When a same Form is needed in multiple places.

```ts
import { DxDrawerModule } from '@ngdx/dijta';
```

## API

### dx-drawer

| Props | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| `[dxClosable]` | Whether a close (x) button is visible on top left of the Drawer dialog or not. | `boolean` | `true` |
| `[dxCloseIcon]` | Custom close icon | `string \| TemplateRef<void> \| null` | `'close'` |
| `[dxExtra]` | Extra actions area at corner. | `string \| TemplateRef<void> \| null` | - |
| `[dxMask]` | Whether to show mask or not. | `boolean` | `true` | ✅ |
| `[dxMaskClosable]` | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` | `true` | ✅ |
| `[dxCloseOnNavigation]` | Whether to close the drawer when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean` | `true` | ✅ |
| `[dxKeyboard]` | Whether support press esc to close | `boolean` | `true` |
| `[dxMaskStyle]` | Style for Drawer's mask element. | `object` | `{}` |
| `[dxBodyStyle]` | Body style for drawer body element. Such as height, padding etc. | `object` | `{}` |
| `[dxTitle]` | The title for Drawer. | `string \| TemplateRef<void>` | - |
| `[dxFooter]` | The footer for Drawer. | `string \| TemplateRef<void>` | - |
| `[dxVisible]` | Whether the Drawer dialog is visible or not, you can use `[(dxVisible)]` two-way binding | `boolean` | `false` |
| `[dxPlacement]` | The placement of the Drawer. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| `[dxSize]` | Preset size of drawer, default `378px` and large `736px`.  | `'default' \| 'large'` | `'default'` |
| `[dxWidth]` | Width of the Drawer dialog, only when placement is `'right'` or `'left'`, having a higher priority than `dxSize`.  | `number \| string` | - |
| `[dxHeight]` | Height of the Drawer dialog, only when placement is `'top'` or `'bottom'`, having a higher priority than `dxSize`.  | `number \| string` | - |
| `[dxOffsetX]` | The the X coordinate offset(px), only when placement is `'right'` or `'left'`. | `number` | `0` |
| `[dxOffsetY]` | The the Y coordinate offset(px), only when placement is `'top'` or `'bottom'`. | `number` | `0` |
| `[nzWrapClassName]` | The class name of the container of the Drawer dialog. | `string` | - |
| `[dxZIndex]` | The `z-index` of the Drawer. | `number` | `1000` |
| `(dxOnClose)` | Specify a callback that will be called when a user clicks mask, close button or Cancel button. | `EventEmitter<MouseEvent>` | - |

### DxDrawerService

| Method | Description | Params | Return |
| --- | --- | --- | --- |
| create<T, D, R> | create and open an Drawer | `DxDrawerOptions<T, D>`| `DxDrawerRef<T, R>` |

### DxDrawerOptions

| Params | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| dxContent |  The drawer body content. | `TemplateRef<{ $implicit: D, drawerRef: DxDrawerRef }> \| Type<T>` | - |
| dxContentParams | The component inputs the param / The Template context. | `D` | - |
| dxClosable | Whether a close (x) button is visible on top left of the Drawer dialog or not. | `boolean` | `true` |
| dxCloseIcon | Custom close icon | `string \| TemplateRef<void> \| null` | `'close'` |
| dxExtra | Extra actions area at corner. | `string \| TemplateRef<void> \| null` | - |
| dxOnCancel | Execute when click on the mask or the upper cancel button, This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return false to prevent closing) | `() => Promise<any>` | - |
| dxMaskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` | `true` | ✅ |
| dxCloseOnNavigation    | Whether to close the drawer when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean` | `true` | ✅ |
| dxMask | Whether to show mask or not. | `boolean` | `true` | ✅ |
| dxDirection        | Direction of the text in the modal | `'ltr' \| 'rtl'` | - | ✅ |
| dxKeyboard | Whether support press esc to close | `boolean` | `true` |
| dxMaskStyle | Style for Drawer's mask element. | `object` | `{}` |
| dxBodyStyle | Body style for modal body element. Such as height, padding etc. | `object` | `{}` |
| dxTitle | The title for Drawer. | `string \| TemplateRef<void>` | - |
| dxFooter | The footer for Drawer. | `string \| TemplateRef<void>` | - |
| dxSize | Preset size of drawer, default `378px` and large `736px`.  | `'default' \| 'large'` | `'default'` |
| dxWidth |  Width of the Drawer dialog, only when placement is `'right'` or `'left'`, having a higher priority than `nzSize`.  | `number \| string` | - |
| dxHeight | Height of the Drawer dialog, only when placement is `'top'` or `'bottom'`, having a higher priority than `nzSize`.  | `number \| string` | - |
| dxWrapClassName | The class name of the container of the Drawer dialog. | `string` | - |
| dxZIndex| The `z-index` of the Drawer. | `number` | `1000` |
| dxPlacement | The placement of the Drawer. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| dxOffsetX | The the X coordinate offset(px). | `number` | `0` |
| dxOffsetY | The the Y coordinate offset(px), only when placement is `'top'` or `'bottom'`. | `number` | `0` |

### DxDrawerRef

#### Methods
| Name | Description | Type |
| --- | --- | --- |
| close | close the drawer. | `(result?: R) => void` |
| open | open the drawer. | `() => void` |
| getContentComponent| Returns the instance when `nzContent` is the component. | `() => T \| null` |

#### Property
| Name | Description | Type |
| --- | --- | --- |
| afterOpen | Callback called after open. | `Observable<void>` |
| afterClose | Callback called after close. | `Observable<R>` |
| dxCloseIcon | Custom close icon | `string \| TemplateRef<void> \| null` |
| dxClosable | Whether a close (x) button is visible on top right of the Drawer dialog or not. | `boolean` |
| nzMaskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` |
| dxMask | Whether to show mask or not. | `boolean` |
| dxKeyboard | Whether support press esc to close | `boolean` |
| dxMaskStyle | Style for Drawer's mask element. | `object` |
| dxBodyStyle | Body style for modal body element. Such as height, padding etc. | `object` |
| dxTitle | The title for Drawer. | `string \| TemplateRef<void>` |
| dxFooter | The footer for Drawer. | `string \| TemplateRef<void>` |
| dxWidth |  Width of the Drawer dialog.  | `number \| string` |
| dxHeight | Height of the Drawer dialog, only when placement is `'top'` or `'bottom'`.  | `number \| string` |
| dxWrapClassName | The class name of the container of the Drawer dialog. | `string` |
| dxZIndex| The `z-index` of the Drawer. | `number` |
| dxPlacement | The placement of the Drawer. | `'top' \| 'right' \| 'bottom' \| 'left'` |
| dxOffsetX | The the X coordinate offset(px). | `number` |
| dxOffsetY | The the Y coordinate offset(px), only when placement is `'top'` or `'bottom'`. | `number` |