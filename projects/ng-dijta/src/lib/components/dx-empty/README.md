---
category: Components
type: Data Display
title: Empty
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/MNbKfLBVb/Empty.svg
---

Empty state placeholder.

## When To Use

When there is no data provided, display for friendly tips.

```ts
import { DxEmptyModule } from '@ngdx/dijta';
```

## API

### dx-empty

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[dxNotFoundImage]` | Customize image. Will tread as image url when string provided | `string \| TemplateRef<void>` | - |
| `[dxNotFoundContent]` | Custom description | `string \| TemplateRef<void> \| null` | - |
| `[dxNotFoundFooter]` | Custom Footer | `string \| TemplateRef<void>` | - |

### `DX_CONFIG`

The `dxEmpty` interface has properties as follows:

| Properties | Description | Type |
| ----- | --- | ---- |
| `dxDefaultEmptyContent` | User default empty component. You can restore the system default empty content by providing `undefined` | `Type<any>\|TemplateRef<string>\|string\|undefined` |

### InjectionToken

| Token | Description | Parameters |
| ----- | --- | ---- |
| `DX_EMPTY_COMPONENT_NAME` | Would be injected to `DX_DEFAULT_EMPTY_CONTENT`, telling that component its parent component's name | `string` |

### Global Customizable Empty Content

You may notice or used some inputs like `dxNotFoundContent` in some components. Now they would use `Empty` component. So you can provide `dxDefaultEmptyContent` to customize them.

```ts
{
  provide: DX_CONFIG,
  useValue: {
    empty: {
      dxDefaultEmptyContent
    }
  }
}
```