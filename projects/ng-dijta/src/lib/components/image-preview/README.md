---
category: Components
type: Data Display
title: Image Preview
---

A full-screen image lightbox with zoom, rotate, pan, keyboard navigation, and open / download actions. Typically attached to any container of `<img>` elements via the `[dImagePreview]` directive; the preview component itself is opened through `ModalService`.

## When To Use

- When users need to view images at full resolution with zoom and rotate controls.
- When a gallery of images should support keyboard navigation (left / right arrows).
- When images inside a container should open in a lightbox on click without extra wiring.
- For download / open-in-new-tab flows on image assets.

## API

```html
<!-- Attach the preview directive to any container that holds <img> elements -->
<div dImagePreview>
  <img src="/assets/photo-1.jpg" alt="Photo 1" />
  <img src="/assets/photo-2.jpg" alt="Photo 2" />
  <img src="/assets/photo-3.jpg" alt="Photo 3" />
</div>
```

### [dImagePreview] directive

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[disableDefault]` | Disable the default click-to-open behavior on `<img>` children | `boolean` | `false` |
| `[customSub]` | External subject that, when emitted, opens the preview for a given `HTMLElement` | `Subject<HTMLElement>` | - |
| `[zIndex]` | z-index of the preview modal | `number` | - |
| `[backDropZIndex]` | z-index of the backdrop | `number` | - |

### d-image-preview component

This component is instantiated internally by the directive through `ModalService`. It is documented here for completeness.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[data]` | Preview data | `{ images: HTMLElement[]; targetImage: HTMLElement; onClose: () => void }` | - |

### Methods (component)

| Method | Description | Signature |
|--------|-------------|-----------|
| `pre` | Show the previous image | `() => void` |
| `next` | Show the next image | `() => void` |
| `zoomIn` / `zoomOut` | Adjust zoom level | `() => void` |
| `rotate` | Rotate the current image 90 degrees | `() => void` |
| `setScaleBest` | Fit to viewport | `() => void` |
| `setScaleOriginal` | Show at original size | `() => void` |
| `getOriginalImage` | Open / download the original image | `(isDownload?: boolean) => void` |

## Examples

### Basic usage with the directive

```html
<div dImagePreview>
  <img *ngFor="let src of images" [src]="src" [alt]="src" />
</div>
```

### Trigger programmatically via a custom subject

```typescript
imageSubject = new Subject<HTMLElement>();

openAt(el: HTMLElement): void {
  this.imageSubject.next(el);
}
```

```html
<div dImagePreview [disableDefault]="true" [customSub]="imageSubject">
  <img *ngFor="let src of images" [src]="src" (click)="openAt($event.target)" />
</div>
```

### Custom z-index for overlay stacks

```html
<div dImagePreview [zIndex]="2000" [backDropZIndex]="1999">
  <img src="/assets/diagram.png" />
</div>
```

## Import

```typescript
import { ImagePreviewModule } from '@ngdx/dijta';

@NgModule({
  imports: [ImagePreviewModule]
})
export class YourModule { }
```
