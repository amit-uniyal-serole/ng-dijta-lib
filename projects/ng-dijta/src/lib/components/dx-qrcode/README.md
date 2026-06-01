---
category: Components
type: Data Display
title: QR Code
---

Renders a QR code from arbitrary string data. Supports canvas, SVG, `img`, and data-URL output; configurable error-correction, size, margin, colors, version, and optional center image.

## When To Use

- When encoding a URL, payment link, auth token, or short payload into a scannable 2D barcode.
- When a branded QR code is needed (center image overlay).
- When the QR image must be exported / shared (listen for `qrCodeURL`).

## API

```html
<dx-qrcode
  qrdata="https://example.com"
  [width]="256"
  errorCorrectionLevel="M">
</dx-qrcode>
```

### dx-qrcode

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[qrdata]` | Data to encode into the QR code | `string` | `''` |
| `[elementType]` | Output element type | `'canvas' \| 'svg' \| 'img' \| 'url'` | `'canvas'` |
| `[width]` | Size of the rendered QR code in pixels | `number` | `10` |
| `[scale]` | Module scale factor | `number` | `4` |
| `[margin]` | Quiet-zone margin in modules | `number` | `4` |
| `[errorCorrectionLevel]` | Error-correction level | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` |
| `[version]` | QR code version (1-40) | `DxQRCodeVersion` | - |
| `[colorDark]` | Foreground color (hex with alpha) | `string` | `'#000000ff'` |
| `[colorLight]` | Background color (hex with alpha) | `string` | `'#ffffffff'` |
| `[allowEmptyString]` | Permit an empty `qrdata` string | `boolean` | `false` |
| `[cssClass]` | CSS class applied to the host element | `string` | `'qrcode'` |
| `[imageSrc]` | URL of a center image overlaid on the QR code | `string` | - |
| `[imageHeight]` | Height of the center image (px) | `number` | `40` |
| `[imageWidth]` | Width of the center image (px) | `number` | `40` |
| `[alt]` | `alt` text applied to `img` output | `string` | - |
| `[ariaLabel]` | Accessible label for the rendered element | `string` | - |
| `[title]` | `title` attribute on the rendered element | `string` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(qrCodeURL)` | Emitted with a sanitized URL of the generated QR code | `EventEmitter<SafeUrl>` |

### Types

```typescript
type DxQRCodeElementType = 'url' | 'img' | 'canvas' | 'svg';

type DxQRCodeVersion = 0 | 1 | 2 | /* ... */ | 40;
```

## Examples

### Basic QR code

```html
<dx-qrcode qrdata="https://example.com" [width]="256"></dx-qrcode>
```

### SVG output with custom colors

```html
<dx-qrcode
  qrdata="Hello, world!"
  elementType="svg"
  colorDark="#0f172a"
  colorLight="#f8fafc"
  errorCorrectionLevel="H"
  [width]="320">
</dx-qrcode>
```

### Branded with center image

```html
<dx-qrcode
  qrdata="https://example.com"
  [width]="320"
  imageSrc="/assets/logo.png"
  [imageWidth]="64"
  [imageHeight]="64"
  ariaLabel="Visit our site"
  (qrCodeURL)="onQrReady($event)">
</dx-qrcode>
```

## Import

```typescript
import { DxQrcodeModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxQrcodeModule]
})
export class YourModule { }
```
